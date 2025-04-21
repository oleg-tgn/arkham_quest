import { QuestLocations } from '../data/QuestLocations';

export type GameLogEntry = {
  id: number;
  haveClues: boolean;
  location: keyof typeof QuestLocations | string;
};
