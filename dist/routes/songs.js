"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songRouter = void 0;
const express_1 = __importDefault(require("express"));
const songs_1 = require("../controllers/songs");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const server_error_1 = require("../errors/server-error");
exports.songRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(new server_error_1.ServerError("file failed to upload"), file.fieldname === "audio" ? "./public/audio" : "./public/thumbnails");
    },
    filename: (req, file, cb) => {
        //  console.log(file)
        cb(new server_error_1.ServerError("file failed to upload"), Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const multipleUpload = upload.fields([{ name: "audio", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]);
exports.songRouter.get("/", songs_1.getAllSongs);
exports.songRouter.post("/", multipleUpload, songs_1.uploadSong);
exports.songRouter.get("/getAudio/:name", songs_1.getAudio);
