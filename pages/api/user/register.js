import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../modals/user';
import db from '../../../helpers/mongoConnect'
import { signToken } from '../../../helpers/auth';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
    });
    const user = await newUser.save();
    await db.disconnect();
    const token = signToken(user);
    res.send({
        token,
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

export default handler;