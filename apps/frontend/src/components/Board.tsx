import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { Column } from "./Column";
import { Box, CircularProgress, Typography } from "@mui/material";
import { CardStatus } from "../../../../packages/constants";
import { useErrorBoundary } from "react-error-boundary";
import { Card, } from "types"
import { addCardAtom, columnsAtom, getAllCardsAtom, loadingAtom, removeCardAtom, updateCardContentAtom, updateCardStatusAtom } from "../store";

export const Board: React.FC = () => {
    const [columns, setColumns] = useAtom(columnsAtom);
    const [loading,] = useAtom(loadingAtom);
    const [, addCard] = useAtom(addCardAtom);
    const [, getAllCards] = useAtom(getAllCardsAtom);
    const [, removeCard] = useAtom(removeCardAtom);
    const [, updateCardContent] = useAtom(updateCardContentAtom);
    const [, updateCardStatus] = useAtom(updateCardStatusAtom);
    const { showBoundary } = useErrorBoundary();

    const moveCard = (sourceColumn: CardStatus, targetColumn: CardStatus, card: Card) => {
        setColumns((prevState) => {
            const sourceCards = [...prevState[sourceColumn]];
            const targetCards = [...prevState[targetColumn]];

            const cardIndex = sourceCards.findIndex((c) => c.id === card.id);
            if (cardIndex > -1) {
                sourceCards.splice(cardIndex, 1);
            }

            targetCards.push(card);

            return {
                ...prevState,
                [sourceColumn]: sourceCards,
                [targetColumn]: targetCards,
            };
        });
    };

    const handleAddCard = async (status: CardStatus) => {
        addCard(status).catch(showBoundary)
    }
    const handleRemoveCard = async (card: Card) => {
        removeCard(card).catch(showBoundary)
    }

    const handleUpdateCardContent = async (id: number, content: string) => {
        updateCardContent({ id, content }).catch(showBoundary)
    }

    const handleUpdateCardStatus = async (id: number, status: CardStatus) => {
        updateCardStatus({ id, status }).catch(showBoundary)
    }

    useEffect(() => {
        getAllCards().catch(showBoundary)
    }, [getAllCards]);


    return (
        <Box style={{ padding: "40px 60px" }}>
            <Typography variant="h4">Tasks List</Typography>
            {loading && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
            )}
            <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                {Object.keys(columns).map((colName) => (
                    <Column
                        key={colName}
                        title={CardStatus[colName as keyof typeof CardStatus]}
                        cards={columns[colName]}
                        moveCard={moveCard}
                        addCard={handleAddCard}
                        removeCard={handleRemoveCard}
                        updateCardContent={handleUpdateCardContent}
                        updateCardStatus={handleUpdateCardStatus}
                    />
                ))}
            </Box>
        </Box>
    );
};
