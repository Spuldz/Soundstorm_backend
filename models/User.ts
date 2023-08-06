import mongoose from "mongoose";

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
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
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createRefreshToken = async function(){
    return await jwt.sign({id: this._id, username:this.username, roles: this.roles}, process.env.JWT_KEY)
}

UserSchema.methods.createAccessToken = async function(){
    return await jwt.sign({id: this._id, username:this.username, roles: this.roles}, process.env.JWT_KEY, {
        expiresIn: '15m'
    })
}

UserSchema.methods.comparePasswords = async function(candidatePassword:string){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);