import mongoose from 'mongoose';
import db from '../../helpers/mongoConnect'
import SavedCard from '../../modals/SavedCard'

export default async function handler(req, res) {
    const { method, body, query } = req;
    await db.connect();

    switch (method) {
        case 'POST':
            try {
                const { userId, cardDetails } = body;
                const card = new SavedCard({ ...cardDetails, userId });
                await card.save();
                res.status(201).json({ message: 'Card saved successfully' });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error saving card' });
            }
            break;

        case 'GET':
            try {
                const { userId } = query;
                const cards = await SavedCard.find({ userId });
                res.status(200).json({ cards });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error retrieving cards' });
            }
            break;

        case 'DELETE':
            try {
                const { cardId } = body;
                if (!cardId) {
                    return res.status(400).json({ message: 'Invalid card ID' });
                }
                const deletedCard = await SavedCard.findByIdAndDelete(mongoose.Types.ObjectId(cardId));
                if (deletedCard) {
                    res.status(200).json({ message: 'Card deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Card not found' });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error deleting card' });
            }
            break;


        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
