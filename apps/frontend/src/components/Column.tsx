import React from 'react';
import { useDrop } from 'react-dnd';
import { CardItem } from './CardItem';
import { Box, Button, Typography } from '@mui/material';
import { CardStatus } from 'packages/constants';
import { Card } from '../types';
import { useBoardContext } from '../context';

interface ColumnProps {
  title: CardStatus;
  cards: Card[];
}

type DropItem = {
  sourceColumn: CardStatus;
  card: Card;
};

export const Column: React.FC<ColumnProps> = ({ title, cards }) => {
  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop: (item: DropItem) => {
      const droppedAt = title;
      moveCard(item.sourceColumn, droppedAt, item.card);
    },
  });

  const { moveCard, addCard } = useBoardContext();

  return (
    <Box
      ref={dropRef}
      sx={{
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: '10px', textTransform: 'capitalize' }}
      >
        {title.toString().toLowerCase()}
      </Typography>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} sourceColumn={title} />
      ))}
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => addCard(title)}
        style={{ marginTop: '16px' }}
      >
        Add New Card
      </Button>
    </Box>
  );
};
