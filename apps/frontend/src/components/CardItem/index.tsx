import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { Card } from '../../types';
import { CardStatus } from '../../constants';
import { Delete } from '@mui/icons-material';
import { useBoardContext } from '../../context';

interface CardItemProps {
  card: Card;
  sourceColumn: CardStatus;
}

export const CardItem: React.FC<CardItemProps> = ({ card, sourceColumn }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { card, sourceColumn },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { removeCard, updateCardContent } = useBoardContext();

  const [content, setContent] = useState(card.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCardContent(card.id, event.target.value);
    setContent(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (content !== card.content) {
      updateCardContent(card.id, content);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (card.content !== content) {
      setContent(card.content); // Sync with new card content
    }
  }, [card.content]);

  return (
    <Paper
      ref={dragRef}
      sx={{
        padding: '10px',
        marginBottom: '8px',
        backgroundColor: isDragging ? '#ddd' : '#fefefe',
        opacity: isDragging ? 0.5 : 1,
        boxShadow: 2,
        cursor: 'grab',
        minHeight: '40px',
      }}
    >
      {isEditing ? (
        <TextField
          autoFocus
          variant="outlined"
          fullWidth
          value={content}
          onChange={handleContentChange}
          onBlur={handleBlur}
          onClick={handleClick}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            {content}
          </Typography>
          <Delete
            data-testid="delete-card"
            onClick={() => removeCard(card)}
            sx={{ color: 'red', cursor: 'pointer' }}
          />
        </Box>
      )}
    </Paper>
  );
};
