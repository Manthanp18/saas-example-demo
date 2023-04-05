// pages/api/cards/[userId].js
import db from "../../../helpers/mongoConnect";

export default async function handler(req, res) {
    const [usersId, setUserId] = useState()
    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const userId = localStorage.getItem('_id');
            setUserId(userId);
        }
    }, []);

    // Connect to MongoDB


    // Filter card data based on user ID
    const cards = await db.collection('savecards').find({ userId: ObjectId(usersId) }).toArray();

    // Return filtered card data
    res.status(200).json(cards);

    // Close MongoDB connection
    client.close();
}
