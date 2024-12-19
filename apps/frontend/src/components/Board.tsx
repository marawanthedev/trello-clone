import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import { Box, Typography } from "@mui/material";
import trpc from "../trpc";
import { CardStatus } from "../../../../packages/constants"

const initialData = {
    [CardStatus.PENDING]: [
        // { id: "1", content: "Task 1" },
        // { id: "2", content: "Task 2" },
    ],
    [CardStatus.INPROGRESS]: [
        // { id: "3", content: "Task 3" },
    ],
    [CardStatus.DONE]: [
        // { id: "4", content: "Task 4" },
    ],
};

export interface Card {
    id: number;
    content: string;
    status: keyof typeof CardStatus;
    // userId: number;
}

interface ColumnData {
    [key: string]: Card[];
}

const initialColumnsData: ColumnData = {
    [CardStatus.PENDING]: [

    ],
    [CardStatus.INPROGRESS]: [
    ],
    [CardStatus.DONE]: [
    ],
};

export const Board: React.FC = () => {
    const [columns, setColumns] = useState<ColumnData>(initialColumnsData);
    // take date with status
    // create columns out of it 
    // then setColumns

    const moveCard = (sourceColumn: CardStatus, targetColumn: CardStatus, card: Card) => {
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

    const addCard = async (status: CardStatus) => {
        try {
            const addedCard: Card = await trpc.card.create.mutate({ content: 'placeholder', status: status, })
            console.log(`Successfully added card with id of:${addedCard.id}`)
            setColumns((prev) => {
                return {
                    ...prev,
                    [addedCard.status]: [
                        ...prev[addedCard.status],
                        addedCard
                    ]
                }
            })
        }
        catch (e: any) {
            console.log(`failed to add card`)
            // throw new Error(e)
        }
    };
    const removeCard = async (card: Card) => {
        try {
            const filteredColumn = columns[card.status].filter((prevCard) => prevCard.id !== card.id)
            const deletedCard = await trpc.card.deleteById.mutate({ id: card.id })

            setColumns((prev) => {
                return {
                    ...prev,
                    [deletedCard.status]: filteredColumn
                }
            })

            console.log(`Successfully deleted card with id of:${deletedCard.id}`)
        } catch (e: any) {
            console.log(`failed to delete card`)
            // throw new Error(e)
        }
    }

    const getAllCards = async () => {

        try {
            const cards = await trpc.card.getAll.query()

            cards.forEach((card) => {
                initialColumnsData[CardStatus[card.status as keyof typeof CardStatus]].push(card)
            })

            setColumns(initialColumnsData)
        }
        catch (e: any) {
            console.log(`failed to get all cards`)
            // throw new Error(e)
        }
    }

    const updateCardContent = async (id: number, content: string) => {
        try {
            const updatedCard = await trpc.card.editContentById.mutate({ content, id, })
            console.log({ updatedCard })
        }
        catch (e) {
            console.log(`failed to update card content`)
            // throw new Error(e)
        }
    }

    const updateCardStatus = async (id: number, status: CardStatus) => {
        try {
            console.log({ id, status })
            const updatedCard = await trpc.card.editStatusById.mutate({ status, id, })
            console.log({ updatedCard })
        }
        catch (e) {
            console.log(`failed to update card status`)
            // throw new Error(e)
        }
    }

    useEffect(() => {
        getAllCards()
    }, [])

    return (
        <Box style={{ padding: "40px 60px" }}>
            <Typography variant="h4">Tasks List</Typography>
            <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                {Object.keys(columns).map((colName) => (
                    <Column
                        key={colName}
                        title={CardStatus[colName as keyof typeof CardStatus]}
                        cards={columns[colName]}
                        moveCard={moveCard}
                        addCard={addCard}
                        removeCard={removeCard}
                        updateCardContent={updateCardContent}
                        updateCardStatus={updateCardStatus}
                    />
                ))}
            </Box>
        </Box>
    );
};
