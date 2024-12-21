import { CardStatus } from '../constants';

export interface Card {
  id: number;
  content: string;
  status: keyof typeof CardStatus;
}
