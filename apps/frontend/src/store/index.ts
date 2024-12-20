import { atom } from "jotai";
import { CardStatus } from "../../../../packages/constants";
import { Card, ColumnData } from "types";
import trpc from "../trpc";

const initialColumnsData: ColumnData = {
    [CardStatus.PENDING]: [],
    [CardStatus.INPROGRESS]: [],
    [CardStatus.DONE]: [],
};

export const columnsAtom = atom(initialColumnsData);
export const loadingAtom = atom(false);

export const addCardAtom = atom(
    null,
    async (get, set, status: CardStatus) => {
        set(loadingAtom, true);
        try {
            const addedCard: Card = await trpc.card.create.mutate({ content: "placeholder", status });
            const currentColumns = get(columnsAtom);
            set(columnsAtom, {
                ...currentColumns,
                [status]: [...currentColumns[status], addedCard],
            });
        } catch (error) {
            console.error("Failed to add card", error);
        } finally {
            set(loadingAtom, false);
        }
    }
);

export const removeCardAtom = atom(
    null,
    async (get, set, card: Card) => {
        set(loadingAtom, true);
        try {
            await trpc.card.deleteById.mutate({ id: card.id });
            const currentColumns = get(columnsAtom);
            set(columnsAtom, {
                ...currentColumns,
                [card.status]: currentColumns[card.status].filter((c) => c.id !== card.id),
            });
        } catch (error) {
            console.error("Failed to delete card", error);
        } finally {
            set(loadingAtom, false);
        }
    }
);

export const updateCardContentAtom = atom(
    null,
    async (get, set, { id, content }: { id: number; content: string }) => {
        set(loadingAtom, true);
        try {
            await trpc.card.editContentById.mutate({ id, content });
        } catch (error) {
            console.error("Failed to update card content", error);
        } finally {
            set(loadingAtom, false);
        }
    }
);

export const updateCardStatusAtom = atom(
    null,
    async (get, set, { id, status }: { id: number; status: CardStatus }) => {
        set(loadingAtom, true);
        try {
            await trpc.card.editStatusById.mutate({ id, status });
        } catch (error) {
            console.error("Failed to update card status", error);
        } finally {
            set(loadingAtom, false);
        }
    }
);


export const getAllCardsAtom = atom(
    null,
    async (get, set) => {
        set(loadingAtom, true);
        try {
            const cards = await trpc.card.getAll.query();
            const currentColumns = get(columnsAtom);

            const updatedColumns = {
                ...currentColumns,
                [CardStatus.PENDING]: [...currentColumns[CardStatus.PENDING]],
                [CardStatus.INPROGRESS]: [...currentColumns[CardStatus.INPROGRESS]],
                [CardStatus.DONE]: [...currentColumns[CardStatus.DONE]],
            };

            cards.forEach((card) => {
                const column = updatedColumns[CardStatus[card.status as keyof typeof CardStatus]];
                if (!column.some((existingCard) => existingCard.id === card.id)) {
                    column.push(card);
                }
            });

            console.log({ cards, updatedColumns })
            set(columnsAtom, updatedColumns);
        } catch (error) {
            console.error("Failed to fetch cards", error);
        } finally {
            set(loadingAtom, false);
        }
    }
);