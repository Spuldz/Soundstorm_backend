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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: [true, "invalid name"],
        minLength: 3
    },
    roles: {
        type: String,
        enum: {
            values: ["USER", "ADMIN"],
            message: "{VALUE} is not supported"
        },
        default: "USER"
    },
    email: {
        type: String,
        require: [true, "invalid email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "invalid password"],
        minLength: 6
    }
});
UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
UserSchema.methods.createRefreshToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jwt.sign({ id: this._id, username: this.username, roles: this.roles }, process.env.JWT_KEY);
    });
};
UserSchema.methods.createAccessToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jwt.sign({ id: this._id, username: this.username, roles: this.roles }, process.env.JWT_KEY, {
            expiresIn: '15m'
        });
    });
};
UserSchema.methods.comparePasswords = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    });
};
module.exports = mongoose_1.default.model("User", UserSchema);
