"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SongSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "invalid name"],
        maxLength: 50
    },
    desc: {
        type: String,
        required: [true, "invalid description"],
        maxLength: 200
    },
    fileName: {
        type: String,
        required: [true, "invalid file name"]
    },
    owner: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "invalid owner"]
    },
    tags: {
        type: [String]
    },
    thumbnail: {
        type: String,
    },
    public: {
        type: Boolean,
        required: [true, "invalid privacy"]
    },
    ownerName: {
        type: String,
        required: [true, "invalid owner name"]
    }
});
exports.default = mongoose_1.default.model("Song", SongSchema);
