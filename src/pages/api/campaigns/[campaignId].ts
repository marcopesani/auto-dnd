// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Campaign } from "./types";
import campaigns from "./campaigns.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Campaign | {}>
) {
  const campaign = campaigns.find(
    (campaign) => campaign.id === parseInt(req.query.campaignId as string)
  );

  if (campaign) {
    res.status(200).json(campaign);
  } else {
    res.status(404).json({});
  }
}
