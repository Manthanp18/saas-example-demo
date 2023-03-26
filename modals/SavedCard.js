import mongoose from 'mongoose';

let SaveCards;

try {
    SaveCards = mongoose.model('SaveCards');
} catch {
    const SaveCardSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user1',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        }
    }, {
        timestamps: true,
    });
    SaveCards = mongoose.model('SaveCards', SaveCardSchema);
}

export default SaveCards;