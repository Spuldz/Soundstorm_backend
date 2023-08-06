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
exports.authMiddleware = void 0;
const bad_request_1 = require("../errors/bad-request");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_error_1 = require("../errors/server-error");
const unauthenticated_1 = require("../errors/unauthenticated");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new bad_request_1.BadRequest("invalid auth header");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new bad_request_1.BadRequest("invalid token");
    }
    try {
        const jwtKey = process.env.JWT_KEY;
        if (!jwtKey) {
            throw new server_error_1.ServerError("encryption key not found");
        }
        const payload = jsonwebtoken_1.default.verify(token, jwtKey);
        req.user = { id: payload.id, username: payload.username, roles: payload.roles };
        next();
    }
    catch (error) {
        throw new unauthenticated_1.Unauthenticated("invalid token");
    }
});
exports.authMiddleware = authMiddleware;
