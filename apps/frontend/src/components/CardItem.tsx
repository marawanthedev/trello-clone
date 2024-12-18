import React from "react";
import { useDrag } from "react-dnd";
import { Paper, Typography } from "@mui/material";
import { Card } from "./Board";

interface CardItemProps {
    card: Card;
    sourceColumn: string;
}

export const CardItem: React.FC<CardItemProps> = ({ card, sourceColumn }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "CARD",
        item: { card, sourceColumn },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

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
            <Typography variant="body2">{card.content}</Typography>
        </Paper>
    );
};
