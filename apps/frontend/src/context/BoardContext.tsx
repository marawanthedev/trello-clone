import { CardStatus } from '../constants';
import React, { createContext, useContext, ReactNode } from 'react';
import { Card } from '../types';

interface BoardContextProps {
  moveCard: (
    sourceColumn: CardStatus,
    targetColumn: CardStatus,
    card: Card,
  ) => void;
  addCard: (status: CardStatus) => Promise<void>;
  removeCard: (card: Card) => Promise<void>;
  updateCardContent: (id: number, content: string) => Promise<void>;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const useBoardContext = (): BoardContextProps => {
  const context = useContext(BoardContext);
  if (!context)
    throw new Error('useBoardContext must be used within a BoardProvider');
  return context;
};

interface BoardProviderProps {
  children: ReactNode;
  value: BoardContextProps;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({
  children,
  value,
}) => {
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
