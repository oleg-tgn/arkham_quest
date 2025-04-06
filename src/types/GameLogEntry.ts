import { QuestLocations } from "../data/QuestLocations";

export type GameLogEntry = {
    id: number;
    title: string | null;
    subtitle: string | null;
    body: string;
    code?: keyof typeof QuestLocations;
  };