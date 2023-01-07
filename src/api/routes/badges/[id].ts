import type { NextFunction, Request, Response } from 'express';
import Database from '@db';

export async function get(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const collection = await Database.instance.collection('badges');
  const user = await collection?.findOne({ id: String(id) });

  console.log(user);

  res.json({ status: 'hi ' });
};