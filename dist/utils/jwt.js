"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// generate jwt token
function generateToken(email) {
    const jwt_secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ email }, jwt_secret);
    return token;
}
exports.generateToken = generateToken;
