import emailRegex from '../../../utils/emailRegex';
import { v4 as uuidv4 } from 'uuid';

const handler = (req, res) => {
  const eventId = req.query.eventId;

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
      return res.status(422).json({ message: 'Invalid input' });
    }

    const newComment = {
      id: uuidv4(),
      email,
      name,
      text,
    };

    return res
      .status(201)
      .json({ message: 'Comment posted.', comment: newComment });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      comments: [{ id: 1, name: 'eric', text: 'hello world' }],
    });
  }
};

export default handler;
