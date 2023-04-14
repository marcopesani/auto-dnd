// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Character } from "./types";
import characters from "./characters.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Character | {}>
) {
  const character = characters.find(
    (character) => character.id === parseInt(req.query.characterId as string)
  );

  if (character) {
    res.status(200).json(character);
  } else {
    res.status(404).json({});
  }
}
