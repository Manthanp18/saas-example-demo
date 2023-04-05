import SaveCards from "../../modals/SavedCard";


export default async function handler(req, res) {
    try {
        const { userId } = req.query;
        // Filter card data based on user ID
        const cards = await SaveCards.find({ userId: userId });

        // Return filtered card data
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to fetch saved cards data" });
    }
}
