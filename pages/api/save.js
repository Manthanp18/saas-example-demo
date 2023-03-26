// import useAuth from '../../config/firebase';
// import connectMongo from '../../helpers/mongoConnect';
// import { SavePost } from '../../modals/dataScheme';


// export async function save(req, res) {
//   const { currentUser } = useAuth();
//   const { method } = req;
//   await connectMongo();
//   switch (method) {
//     case 'GET':
//       try {
//         const savepost = await SavePost.find({ userId: currentUser });
//         res.status(200).json({ success: true, data: savepost });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case 'POST':
//       try {
//         const savepost = await SavePost.create(req.body);
//         res.status(201).json(savepost);
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }
import db from '../../helpers/mongoConnect'
import SavedCard from '../../modals/SavedCard'


export default async function handler(req, res) {


    const { userId, cardDetails } = req.body;
    await db.connect();

    try {
        const card = new SavedCard({ ...cardDetails, userId });
        await card.save();
        res.status(201).json({ message: 'Card saved successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error saving card' });
    }
}
