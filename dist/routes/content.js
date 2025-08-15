"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
exports.contentRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.contentRouter.use(auth_1.verifyToken);
exports.contentRouter.post("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, link, type, userId } = req.body;
    const newContent = yield prisma.content.create({
        data: {
            title: title,
            description: description,
            link: link,
            type: type,
            userId: userId,
        },
    });
    res.json({ msg: "new content added" });
}));
// Fetching all existing documents for a single authenticated user (no pagination)
exports.contentRouter.get("/api/v1/content/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const getAllContents = yield prisma.content.findMany({
        where: {
            userId: userId,
        },
    });
    if (getAllContents.length > 0) {
        res.json({ contents: getAllContents });
    }
    else {
        res.json({
            msg: "user has not added any contents yet",
            contents: getAllContents,
        });
    }
}));
// delete a content
exports.contentRouter.delete("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, userId } = req.body;
    try {
        const deleteContent = yield prisma.content.delete({
            where: {
                id: parseInt(contentId),
                userId: parseInt(userId),
            },
        });
        res.json({ msg: "successfully deleted" });
    }
    catch (err) {
        res.status(403).json({
            msg: "not deleted because there is no content or you've provided an incorrect content id",
        });
    }
}));
