export type Campaign = {
  id: number;
  title: string;
  abstract: string;
  lore: string;
  campaign_objective: string;
  acts: Act[];
};

export type Act = {
  id: number;
  title: string;
  setting: string;
  act_objective: string;
  ending: string;
};