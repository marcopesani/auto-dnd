// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Character } from "./types";
import characters from "./characters.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Character[]>
) {
  res.status(200).json(characters);
}
