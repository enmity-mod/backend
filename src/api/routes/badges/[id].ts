import type { Request, Response } from 'express';
import { useAuth } from '@api/utilities';
import Database from '@db';

export async function get(req: Request, res: Response) {
  const { id } = req.params;

  const collection = Database.instance.collection('badges');
  const user = await collection?.findOne({ id: String(id) });

  res.json(user);
};

export async function post(req: Request, res: Response) {
  const authed = useAuth(req, res);
  if (!authed) return;

  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ success: false, message: 'Body must be of type application/json.' });
  }

  const { badges } = req.body;
  const { id } = req.params;

  if (!badges || !Array.isArray(badges)) {
    return res.status(400).json({ success: false, message: 'Please provide a "badges" array field in your request body.' });
  }

  const collection = Database.instance.collection('badges');

  try {
    await collection?.updateOne({ id: String(id) }, { $set: { id, badges } });

    res.status(200).json({ success: true, message: 'Updated badge.' });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
    console.error(e);
  }
}