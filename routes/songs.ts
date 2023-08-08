import express from 'express'
import { getAllSongs, getAudio, uploadSong } from '../controllers/songs'
import multer from 'multer'
import path from 'path'
import { ServerError } from '../errors/server-error'
import { BadRequest } from '../errors/bad-request'

export const songRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(new ServerError("file failed to upload"), file.fieldname === "audio" ? "./public/audio" : "./public/thumbnails")
    },
    filename: (req, file, cb) => {
      //  console.log(file)
        cb(new ServerError("file failed to upload"), Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})
const multipleUpload = upload.fields([{name: "audio", maxCount: 1}, {name: "thumbnail", maxCount: 1}])

songRouter.get("/", getAllSongs)
songRouter.post("/", multipleUpload, uploadSong)
songRouter.get("/getAudio/:name", getAudio)