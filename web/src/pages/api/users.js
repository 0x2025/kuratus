import { GetItem, PutItem } from '@/libs/Db';
import { v4 as uuidv4 } from 'uuid';
const {
    createHmac,
} = require('node:crypto');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // create user
        const { username, email, slogan } = req.body;
        const key = `${username}/profile.json`;
        const file = await GetItem(key);
        if (file != null) {
            res.status(400).json({
                message: 'Username is existed.'
            });
            return;
        }
        const hmac = createHmac('sha256', uuidv4());

        hmac.update(uuidv4());
        const user = {
            username: username,
            email: email,
            slogan: slogan,
            password: hmac.digest('hex')
        };

        await PutItem(key, user);

        let users = await GetItem('users.json');
        if (users == null) {
            users = [];
        }

        users.push({ username: username, slogan: slogan });
        await PutItem("users.json", users);

        res.status(200).json(user);
        return;
    }

    res.status(200).json({});
}
