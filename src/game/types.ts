export type StoryUpdateType = "narrator" | "character";

export type GameEvents = {
  gameUpdate: (type: StoryUpdateType, update: string, name?: string) => void;
};

export type StoryUpdate = {
  type: StoryUpdateType;
  update: string;
  name?: string;
};
