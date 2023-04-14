import React, { useEffect, useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Game from "@/game";
import Character from "@/game/Character";
import { StoryUpdate } from "@/game/types";
import { Character as CharacterType } from "@/pages//api/characters/types";
import { Campaign as CampaignType } from "@/pages//api/campaigns/types";

export default function Home({
  campaign,
  characters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [game, setGame] = useState<Game | null>(null);
  const [story, setStory] = useState<StoryUpdate[]>([]);
  const [characterAgents, setCharacterAgents] = useState<Character[]>([]);

  useEffect(() => {
    const gameInstance = new Game(campaign);
    const agents = characters.map((character) => new Character(character));

    gameInstance.on("gameUpdate", (type, update, name) => {
      setStory((prevStory) => [
        ...prevStory,
        {
          type,
          update,
          name,
        },
      ]);
    });

    agents.forEach((character) => {
      gameInstance.addCharacter(character);
    });

    setCharacterAgents(agents);
    setGame(gameInstance);

    return () => {
      if (gameInstance) {
        gameInstance.stop();
      }
    };
  }, []);

  return (
    <main className="h-screen w-full flex">
      <Sidebar characters={characterAgents} />
      <MainContent initialStory={campaign.abstract} game={game} story={story} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  campaign: CampaignType;
  characters: CharacterType[];
}> = async (context) => {
  const campaign = await fetchCampaign(context);
  const characters = await fetchCharacters(context);

  return {
    props: {
      campaign,
      characters,
    },
  };
};

export async function fetchCampaign(
  context: GetServerSidePropsContext
): Promise<CampaignType> {
  const host = context.req.headers.host;
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const res = await fetch(`${protocol}://${host}/api/campaigns/1`);
  const campaign = JSON.parse(await res.text())
  return campaign;
}

export async function fetchCharacters(
  context: GetServerSidePropsContext
): Promise<CharacterType[]> {
  const host = context.req.headers.host;
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const res = await fetch(`${protocol}://${host}/api/characters`);
  const characters = JSON.parse(await res.text())
  return characters;
}
