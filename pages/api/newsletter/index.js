import emailRegex from '../../../utils/emailRegex';

function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !emailRegex.test(email)) {
      return res.status(422).json({ message: 'Invalid email address.' });
    }

    return res.status(201).json({ email: email });
  }
}

export default handler;
