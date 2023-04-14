export type Character = {
  id: number;
  name: string;
  description: Description;
  personality: Personality;
};

export type Description = {
  desc: string;
  race: string;
  class: string;
  background: string;
  alignment: string;
  appearance: Appearance;
  abilities: Ability[];
};

export type Appearance = {
  height: string;
  build: string;
  hair: string;
  eyes: string;
  skin?: string;
  clothing: string;
};

export type Ability = {
  name: string;
  description: string;
};

export type Personality = {
  values: string;
  traits: string[];
  goals: string;
};