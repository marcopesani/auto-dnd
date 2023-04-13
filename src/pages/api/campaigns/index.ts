// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Campaign } from './types'
import stories from './campaigns.json'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Campaign[]>
) {
  res.status(200).json(stories)
}
