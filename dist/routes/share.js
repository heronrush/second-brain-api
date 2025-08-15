"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareRouter = void 0;
const express_1 = require("express");
exports.shareRouter = (0, express_1.Router)();
exports.shareRouter.post("/api/v1/brain/share", (req, res) => {
    res.json({ msg: "share content router" });
});
// fetch another user's shared brain content
exports.shareRouter.get("/api/v1/brain/:shareLink", (req, res) => {
    res.json({ msg: "get another user's brain" });
});
