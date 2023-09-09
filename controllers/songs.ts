import { Request, Response } from "express";
import Song from '../models/Song'
import { ISong } from "../types/ISong";
import fs from 'fs'
import path from "path";
import { NotFound } from "../errors/not-found";
import { BadRequest } from "../errors/bad-request";

export const getAllSongs = async (req: Request, res: Response) => {
    const songs = await Song.find({})
    res.json({ songs })
};

  export const uploadSong = async (req:Request | any, res:Response) => {
    console.log("hey")
    console.log(req.files)

    const info:ISong = JSON.parse(req.body.info)

    const audioFile = req.files['audio'][0]
    const thumbnailFile = req.files['thumbnail'][0]


    const data = {...info}
    data.fileName = audioFile.filename
    data.owner = req.user.id
    data.thumbnail = "http://localhost:8080/"+thumbnailFile.filename
    data.tags = ["music"]
    data.ownerName = req.user.username

    const song = await Song.create(data)
    console.log(data)

    res.json({ song })

  } 

  export const getAudio = (req:Request, res:Response) => {
      const {name} = req.params
      
      const filePath = path.resolve("./public/audio",name)
      res.sendFile(filePath)
  }


  export const getAllPublicSongs = async (req:Request, res:Response) => {
      const songs = await Song.find({public: true})
      res.json({ songs })
  }

  export const getSongById = async (req:Request, res:Response) => {
    const {id} = req.params
    if(!id) throw new BadRequest("invalid id")

    const song = await Song.findOne({_id: id})
    if(!song) throw new NotFound("song not found")

    res.json({ song })
  }

  export const searchSongs = async (req:Request, res:Response) => {
    const {query} = req.params
    const regex = new RegExp(query as string, "i")

    const songs = await Song.find({name: {$regex: regex}})

    res.json({ songs })
  }