"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const db_1 = require("../middleware/db");
exports.signinRouter = (0, express_1.Router)();
exports.signinRouter.post("/api/v1/signin", auth_1.validateSigninData, db_1.checkSigninUserExists, (req, res) => {
    res.json({ msg: "signin success" });
});
