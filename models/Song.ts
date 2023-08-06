import mongoose, { Model, Schema } from "mongoose";
import {ISong} from '../types/ISong'

const SongSchema:Schema<ISong> = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "invalid name"],
        maxLength: 50
    },
    desc:{
        type: String,
        required: [true, "invalid description"],
        maxLength: 200
    },
    fileName:{
        type: String,
        required: [true, "invalid file name"]
    },
    owner:{
        type: mongoose.Types.ObjectId,
        required: [true, "invalid owner"]
    },
    tags: {
        type: [String]
    },
    thumbnail:{
        type: String,
    },
    public:{
        type: Boolean,
        required: [true, "invalid privacy"]
    },
    ownerName:{
        type: String,
        required: [true, "invalid owner name"]
    }
})

export default mongoose.model("Song", SongSchema)