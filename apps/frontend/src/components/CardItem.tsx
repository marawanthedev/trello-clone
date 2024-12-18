import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { Card } from "./Board";
import { CardStatus } from "packages/constants";
import { Delete } from "@mui/icons-material";

interface CardItemProps {
    card: Card;
    sourceColumn: CardStatus;
    updateCardContent: (cardId: number, newContent: string) => void;
    removeCard: (card: Card) => void
}

export const CardItem: React.FC<CardItemProps> = ({ card, sourceColumn, updateCardContent, removeCard }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "CARD",
        item: { card, sourceColumn },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [content, setContent] = useState(card.content);
    const [isEditing, setIsEditing] = useState(false);

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    console.log('inner card', card)
    return (
        <Paper
            ref={dragRef}
            sx={{
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: isDragging ? "#ddd" : "#fefefe",
                opacity: isDragging ? 0.5 : 1,
                boxShadow: 2,
                cursor: "grab",
                minHeight: '40px'
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <Typography variant="body1" onClick={handleClick} style={{ cursor: "pointer" }}>
                        {content}
                    </Typography>
                    <Delete onClick={() => removeCard(card)} sx={{ color: 'red', cursor: 'pointer' }} />
                </Box>
            )}
        </Paper>
    );
};
