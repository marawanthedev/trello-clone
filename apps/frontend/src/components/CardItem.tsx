import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { Paper, TextField, Typography } from "@mui/material";
import { Card } from "./Board";

interface CardItemProps {
    card: Card;
    sourceColumn: string;
    updateCardContent: (cardId: string, newContent: string) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ card, sourceColumn, updateCardContent }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "CARD",
        item: { card, sourceColumn },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [content, setContent] = useState(card.content);
    const [isEditing, setIsEditing] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

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
                <Typography variant="body1" onClick={handleClick} style={{ cursor: "pointer" }}>
                    {content}
                </Typography>
            )}
        </Paper>
    );
};
