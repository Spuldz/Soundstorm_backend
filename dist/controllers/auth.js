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
exports.getAccessToken = exports.login = exports.register = void 0;
const bad_request_1 = require("../errors/bad-request");
const not_found_1 = require("../errors/not-found");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthenticated_1 = require("../errors/unauthenticated");
const User = require("../models/User");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.create(Object.assign({}, req.body));
    const refreshToken = yield user.createRefreshToken();
    const accessToken = yield user.createAccessToken();
    res.json({
        user: {
            username: user.username,
            roles: user.roles
        },
        refreshToken,
        accessToken
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new bad_request_1.BadRequest("invalid credentials");
    }
    const user = yield User.findOne({ email: email });
    if (!user) {
        throw new not_found_1.NotFound("invalid email");
    }
    const passwordMatches = yield user.comparePasswords(password);
    if (!passwordMatches) {
        throw new not_found_1.NotFound("invalid password");
    }
    const refreshToken = yield user.createRefreshToken();
    const accessToken = yield user.createAccessToken();
    res.json({
        user: {
            username: user.username,
            roles: user.roles
        },
        refreshToken,
        accessToken
    });
});
exports.login = login;
const getAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new bad_request_1.BadRequest("invalid auth header");
    }
    const refreshToken = authHeader.split(" ")[1];
    if (!refreshToken) {
        throw new bad_request_1.BadRequest("invalid token");
    }
    try {
        const jwtKey = process.env.JWT_KEY;
        const payload = yield jsonwebtoken_1.default.verify(refreshToken, jwtKey);
        const user = yield User.findOne({ _id: payload.id });
        const accessToken = yield user.createAccessToken();
        res.json({ accessToken });
        return;
    }
    catch (error) {
        throw new unauthenticated_1.Unauthenticated("invalid token");
    }
});
exports.getAccessToken = getAccessToken;
