import useAuth from '../../config/firebase';
import connectMongo from '../../helpers/mongoConnect';
import { SavePost } from '../modals/dataScheme';

export async function save(req, res) {
  const { currentUser } = useAuth();
  const { method } = req;
  await connectMongo();
  switch (method) {
    case 'GET':
      try {
        const savepost = await SavePost.find({ userId: currentUser });
        res.status(200).json({ success: true, data: savepost });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const savepost = await SavePost.create(req.body);
        res.status(201).json(savepost);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
