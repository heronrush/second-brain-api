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
exports.checkSigninUserExists = exports.checkSignupUserExists = exports.createNewUser = void 0;
const jwt_1 = require("../utils/jwt");
const hashPassword_1 = require("../utils/hashPassword");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// creates and saves new user to the db
function createNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
        const newUser = yield prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });
        if (newUser) {
            const token = (0, jwt_1.generateToken)(email);
            res.json({ msg: "signup success", token, userId: newUser.id });
        }
        else {
            res.json({ msg: "error while saving a new user to db" });
        }
    });
}
exports.createNewUser = createNewUser;
// checks if user already in the db for signup
function checkSignupUserExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userExists = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists) {
            res.status(403).json({
                msg: "user already exists in the db, provide different unique email",
            });
        }
        else {
            next();
        }
    });
}
exports.checkSignupUserExists = checkSignupUserExists;
// checks if user already in the db for signin
function checkSigninUserExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userExists = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists) {
            const passwordIsCorrect = yield (0, hashPassword_1.checkPassword)(password, userExists.password);
            if (passwordIsCorrect) {
                const token = (0, jwt_1.generateToken)(email);
                res.json({ msg: "signin success", token, userId: userExists.id });
            }
            else {
                res.status(403).json({ msg: "password is incorrect while signing in" });
            }
        }
        else {
            res.status(403).json({
                msg: "no user exists with the provided email while signing in",
            });
        }
    });
}
exports.checkSigninUserExists = checkSigninUserExists;
