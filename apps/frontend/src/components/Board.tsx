import React, { useState } from "react";
import { Column } from "./Column";

const initialData = {
    "To do": [
        { id: "1", content: "Task 1" },
        { id: "2", content: "Task 2" },
    ],
    Doing: [
        { id: "3", content: "Task 3" },
    ],
    Done: [
        { id: "4", content: "Task 4" },
    ],
};

export interface Card {
    id: string;
    content: string;
}

interface ColumnData {
    [key: string]: Card[];
}

export const Board: React.FC = () => {
    const [columns, setColumns] = useState<ColumnData>(initialData);

    const moveCard = (sourceColumn: string, targetColumn: string, card: Card) => {
        setColumns((prevState) => {
            const sourceCards = [...prevState[sourceColumn]];
            const targetCards = [...prevState[targetColumn]];

            // Remove card from source column
            const cardIndex = sourceCards.findIndex((c) => c.id === card.id);
            if (cardIndex > -1) {
                sourceCards.splice(cardIndex, 1);
            }

            // Add card to target column
            targetCards.push(card);

            return {
                ...prevState,
                [sourceColumn]: sourceCards,
                [targetColumn]: targetCards,
            };
        });
    };

    return (
        <div style={{ display: "flex", gap: "16px" }}>
            {Object.keys(columns).map((colName) => (
                <Column
                    key={colName}
                    title={colName}
                    cards={columns[colName]}
                    moveCard={moveCard}
                />
            ))}
        </div>
    );
};
