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
exports.getAudio = exports.uploadSong = exports.getAllSongs = void 0;
const Song_1 = __importDefault(require("../models/Song"));
const path_1 = __importDefault(require("path"));
const getAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield Song_1.default.find({});
    res.json({ songs });
});
exports.getAllSongs = getAllSongs;
const uploadSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    const info = JSON.parse(req.body.info);
    const audioFile = req.files['audio'][0];
    const thumbnailFile = req.files['thumbnail'][0];
    const data = Object.assign({}, info);
    data.fileName = audioFile.filename;
    data.owner = req.user.id;
    data.thumbnail = "http://localhost:8080/" + thumbnailFile.filename;
    data.tags = ["music"];
    data.ownerName = req.user.username;
    const song = yield Song_1.default.create(data);
    res.json({ song });
});
exports.uploadSong = uploadSong;
const getAudio = (req, res) => {
    const { name } = req.params;
    const filePath = path_1.default.resolve("./public/audio", name);
    res.sendFile(filePath);
};
exports.getAudio = getAudio;
