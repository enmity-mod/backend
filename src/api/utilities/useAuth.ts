import type { Request, Response } from 'express';

function useAuth(req: Request, res: Response) {
  if (req.headers['authorization'] !== process.env.API_TOKEN) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  return true;
}

export default useAuth;