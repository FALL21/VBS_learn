import mongoose from "mongoose";
const { isEmail } = require("validator")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [ isEmail, 'invalid email' ]

    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default:0
    },
    subscribers: {
        type: Number,
        default:0
    },
    subscribedUsers: {
        type: [String],
    },
},
{timestamps: true }
);

export default mongoose.model("User", UserSchema);