import React from "react";
import { useDrop } from "react-dnd";
import { CardItem } from "./CardItem";
import { Card } from "./Board";

interface ColumnProps {
    title: string;
    cards: Card[];
    moveCard: (sourceColumn: string, targetColumn: string, card: Card) => void;
}

export const Column: React.FC<ColumnProps> = ({ title, cards, moveCard }) => {
    const [, dropRef] = useDrop({
        accept: "CARD",
        drop: (item: any) => {
            moveCard(item.sourceColumn, title, item.card);
        },
    });

    return (
        <div
            ref={dropRef}
            style={{
                flex: 1,
                backgroundColor: "#f4f4f4",
                padding: "16px",
                minHeight: "300px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
        >
            <h3>{title}</h3>
            {cards.map((card) => (
                <CardItem key={card.id} card={card} sourceColumn={title} />
            ))}
        </div>
    );
};
