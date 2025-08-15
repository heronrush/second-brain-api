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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.validateSigninData = exports.validateSignupData = void 0;
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// signup schema
const signupSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
// signin schema
const signinSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
// validates signup data
function validateSignupData(req, res, next) {
    const { email, password } = req.body;
    const validData = signupSchema.safeParse({ email, password });
    if (validData.success) {
        next();
    }
    else {
        res.status(411).json({ msg: "Error in signup inputs" });
    }
}
exports.validateSignupData = validateSignupData;
// validates signin data
function validateSigninData(req, res, next) {
    const { email, password } = req.body;
    const validData = signinSchema.safeParse({ email, password });
    if (validData.success) {
        next();
    }
    else {
        res.status(411).json({ msg: "not valid data provided in signin" });
    }
}
exports.validateSigninData = validateSigninData;
// verifies jwt on every route
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const jwt_secret = process.env.JWT_SECRET;
        if (token) {
            const verified = jsonwebtoken_1.default.verify(token, jwt_secret, (err, decodedPayload) => {
                if (err) {
                    res.json({ msg: "wrong jwt provided" });
                }
                else {
                    next();
                }
            });
        }
        else {
            res.json({ msg: "no token provided" });
        }
    });
}
exports.verifyToken = verifyToken;
