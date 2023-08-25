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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const error_handler_1 = require("./middleware/error-handler");
const not_found_1 = require("./middleware/not-found");
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./database/connect");
const auth_1 = require("./middleware/auth");
const auth_2 = require("./routes/auth");
const user_1 = require("./routes/user");
const songs_1 = require("./routes/songs");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = 8080 || process.env.PORT;
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
app.use(express_1.default.static("./public/thumbnails"));
app.use("/api/v1/auth", auth_2.authRouter);
app.use("/api/v1/user", auth_1.authMiddleware, user_1.userRouter);
app.use("/api/v1/song", auth_1.authMiddleware, songs_1.songRouter);
app.get("/hello", auth_1.authMiddleware, (req, res) => {
    res.send("hello world");
});
//middleware
app.use(error_handler_1.errorHandlerMiddleware);
app.use(not_found_1.NotFoundMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("listening on port: " + port);
        });
    }
    catch (error) {
        console.log("failed to start server");
    }
});
start();
