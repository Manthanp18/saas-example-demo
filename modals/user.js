// import Mongoose from "mongoose";

// const userSchema = new Mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isAdmin: { type: Boolean, required: true, default: false },

// }, {
//     timestamps: true
// });

// const User = Mongoose.models.User || Mongoose.model("User1", userSchema)

// export default User

import mongoose from 'mongoose';

let User;

try {
    User = mongoose.model('User1');
} catch {
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    }, {
        timestamps: true,
    });
    User = mongoose.model('User1', userSchema);
}

export default User;
