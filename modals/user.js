import mongoose from 'mongoose';

let User;

try {
    User = mongoose.model('User1');
} catch {
    const userSchema = new mongoose.Schema({
        username: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String },
        isAdmin: { type: Boolean, require: true, default: false },
    }, {
        timestamps: true,
    });
    User = mongoose.model('User1', userSchema);
}

export default User;
