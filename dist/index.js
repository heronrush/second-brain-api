"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const root_1 = require("./routes/root");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(root_1.rootRouter);
app.get("/", (req, res) => {
    res.json({ msg: "second brain" });
});
app.use((err, req, res, next) => {
    // set the status code
    res.status(500).json({
        status: "error",
        message: err.message || "Internal server error",
    });
});
app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
