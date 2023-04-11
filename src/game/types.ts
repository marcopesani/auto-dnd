export type StoryUpdateType = "narrator" | "character";

export type GameEvents = {
  storyUpdate: (type: StoryUpdateType, update: string, name?: string) => void;
};

export type StopyUpdate = {
  type: StoryUpdateType;
  update: string;
  name?: string;
};
