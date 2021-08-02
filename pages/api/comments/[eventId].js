import emailRegex from '../../../utils/emailRegex';
import {
  connectDB,
  insertDocument,
  getAllDocuments,
} from '../../../utils/db-util';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDB();
  } catch (err) {
    res.status(500).json({ message: 'Connecting to the database failed.' });
    client.close();
    return;
  }

  if (req.method === 'POST') {
    // add server side validation
    const { email, name, text } = req.body;

    if (
      !emailRegex.test(email) ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Comment posted.', comment: newComment });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Inserting comment to the database failed.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: 'Unable to fetch all comments.' });
    }
  }

  client.close();
};

export default handler;
