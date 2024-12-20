import { CardStatus } from "packages/constants";

export interface Card {
  id: number;
  content: string;
  status: keyof typeof CardStatus;
}
