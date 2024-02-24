import { getWeek } from 'date-fns';
import { GetItem, PutItem } from "@/libs/Db";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {

  const user = getUser(req);
  console.log(user)
  const currentWeek = getWeek(new Date());
  const key = `${user}/week-${currentWeek}.json`;
  if (req.method === 'GET') {
    const file = await GetItem(key)
    res.status(200).json(file);
    return;
  }

  if (req.method === 'POST') {

    let file = await GetItem(key);
    if (file == null) {
      file = [];
    }

    const { href, title, description, tags, _private } = req.body;
    const newItem = { _private, href, title, description, tags, id: uuidv4() };
    file.push(newItem);
    await PutItem(key, file);
    res.status(200).json(newItem);
    return
  }
  res.status(200).json(process.env);
}


function getUser(req) {
  const authheader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  return user;
}