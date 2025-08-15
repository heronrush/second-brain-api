"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const db_1 = require("../middleware/db");
exports.signupRouter = (0, express_1.Router)();
exports.signupRouter.post("/api/v1/signup", auth_1.validateSignupData, db_1.checkSignupUserExists, db_1.createNewUser, (req, res) => {
    res.json({ msg: "signup successful" });
});
