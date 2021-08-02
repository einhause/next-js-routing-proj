import { connectDB, insertDocument } from '../../../utils/db-util';
import emailRegex from '../../../utils/emailRegex';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !emailRegex.test(email)) {
      return res.status(422).json({ message: 'Invalid email address.' });
    }

    let client;

    try {
      client = await connectDB();
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed.' });
    }

    try {
      await insertDocument(client, 'newsletter', { email: email });
      client.close();
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Inserting data to the database failed.' });
    }

    res.status(201).json({ message: 'Signed up!', email: email });
  }
}

export default handler;
