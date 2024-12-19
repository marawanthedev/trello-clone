import React from "react";
import { useDrop } from "react-dnd";
import { CardItem } from "./CardItem";
import { Card } from "./Board";
import { Box, Button, Typography } from "@mui/material";
import { CardStatus } from "packages/constants";

interface ColumnProps {
    title: CardStatus;
    cards: Card[];
    moveCard: (sourceColumn: CardStatus, targetColumn: CardStatus, card: Card) => void;
    addCard: (column: CardStatus) => void;
    removeCard: (card: Card) => void;
    updateCard: (id: number, content: string, status: CardStatus) => void
}

export const Column: React.FC<ColumnProps> = ({ title, cards, moveCard, addCard, removeCard, updateCard }) => {
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
            <Typography variant="h4" sx={{ marginBottom: '10px', textTransform: "capitalize" }}>{title.toString().toLowerCase()}</Typography>
            {cards.map((card) => (
                <CardItem key={card.id} card={card} sourceColumn={title} updateCardContent={() => { }} removeCard={removeCard} updateCard={updateCard} />
            ))}
            <Button variant="contained" sx={{ width: "100%" }} onClick={() => addCard(title)} style={{ marginTop: "16px" }}>
                Add New Card
            </Button>
        </Box>
    );
};
