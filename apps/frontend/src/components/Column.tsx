import React from "react";
import { useDrop } from "react-dnd";
import { CardItem } from "./CardItem";
import { Card } from "./Board";
import { Box, Button, Typography } from "@mui/material";

interface ColumnProps {
    title: string;
    cards: Card[];
    moveCard: (sourceColumn: string, targetColumn: string, card: Card) => void;
    addNewCard: (column: string) => void;  // Function to add a new card
}

export const Column: React.FC<ColumnProps> = ({ title, cards, moveCard, addNewCard }) => {
    const [, dropRef] = useDrop({
        accept: "CARD",
        drop: (item: any) => {
            moveCard(item.sourceColumn, title, item.card);
        },
    });

    return (
        <Box
            ref={dropRef}
            sx={{
                flex: 1,
                backgroundColor: "#f4f4f4",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: '10px' }}>{title}</Typography>
            {cards.map((card) => (
                <CardItem key={card.id} card={card} sourceColumn={title} updateCardContent={() => { }} />
            ))}
            <Button variant="contained" sx={{ width: "100%" }} onClick={() => addNewCard(title)} style={{ marginTop: "16px" }}>
                Add New Card
            </Button>
        </Box>
    );
};
