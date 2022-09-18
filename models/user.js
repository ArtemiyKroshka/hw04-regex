import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zа-яёєї]+$/i,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-z-.\d]+@(\w+\.|\w+\.\w+\.)[a-z]+$/i,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^\+3\(\d{4}\) \d{3}-\d{2}-\d{2}$/,
    },
    passport: {
        type: String,
        required: true,
        unique: true,
        match: /^([A-Z]{2}\d{6}|\d{9})$/,
    },
    birthday: {
        type: String,
        required: true,
        match: /^(((0[1-9]|[12]\d|3[01])-(0[13578]|1[02])-(19\d{2}|20[0-2]{2}))|((0[1-9]|[12]\d|30)-(0[469]|11)-(19\d{2}|20[0-2]{2}))|((0[1-9]|1\d|2[0-8])-02-(19\d{2}|20[0-2]{2})))$/,
    }
}, {versionKey: false});

const handleErrors = (error, data, next)=> {
    const {name, code} = error;
    if(name === "MongoServerError" && code === 11000) {
        error.status = 409;
    }
    else {
        error.status = 400;
    }
    next()
}
userSchema.post("save", handleErrors);
const User = model("user", userSchema);
export default User;