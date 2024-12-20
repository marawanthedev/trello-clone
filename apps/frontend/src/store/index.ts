import { atom, getDefaultStore } from "jotai";
import { CardStatus } from "../../../../packages/constants";
import { Card, ColumnData } from "types";
import trpc from "../trpc";

const initialColumnsData: ColumnData = {
    [CardStatus.PENDING]: [],
    [CardStatus.INPROGRESS]: [],
    [CardStatus.DONE]: [],
};

const store = getDefaultStore();
export const columnsAtom = atom(initialColumnsData);
export const loadingAtom = atom(false);
export const showLoaderAtom = atom(false);


const broadcast = new BroadcastChannel("board_sync");

broadcast.onmessage = (event) => {
    if (event.data.type === "SYNC_COLUMNS") {
        const { columns } = event.data;
        store.set(syncColumnsAtom, columns);
    }
};

export const syncColumnsAtom = atom(null, (get, set, columns: ColumnData) => {
    set(columnsAtom, columns);
});

const broadcastUpdate = (columns: ColumnData) => {
    broadcast.postMessage({ type: "SYNC_COLUMNS", columns });
};

export const addCardAtom = atom(null, async (get, set, status: CardStatus) => {
    set(loadingAtom, true);
    try {
        const addedCard: Card = await trpc.card.create.mutate({
            content: "placeholder",
            status,
        });
        const currentColumns = get(columnsAtom);
        set(columnsAtom, {
            ...currentColumns,
            [status]: [...currentColumns[status], addedCard],
        });

        broadcastUpdate(get(columnsAtom));
    } catch (error) {
        console.error("Failed to add card", error);
    } finally {
        set(loadingAtom, false);
    }
});

export const removeCardAtom = atom(null, async (get, set, card: Card) => {
    set(loadingAtom, true);
    try {
        await trpc.card.deleteById.mutate({ id: card.id });
        const currentColumns = get(columnsAtom);
        set(columnsAtom, {
            ...currentColumns,
            [card.status]: currentColumns[card.status].filter(
                (c) => c.id !== card.id,
            ),
        });
        broadcastUpdate(get(columnsAtom));
    } catch (error) {
        console.error("Failed to delete card", error);
    } finally {
        set(loadingAtom, false);
    }
});

export const updateCardContentAtom = atom(
    null,
    async (get, set, { id, content }: { id: number; content: string }) => {
        set(loadingAtom, true);
        try {
            await trpc.card.editContentById.mutate({ id, content });

            const currentColumns = get(columnsAtom);
            const updatedColumns = { ...currentColumns };
            Object.keys(updatedColumns).forEach((columnKey) => {
                updatedColumns[columnKey] = updatedColumns[columnKey].map((card) =>
                    card.id === id ? { ...card, content } : card,
                );
            });

            set(columnsAtom, updatedColumns);
            console.log({ updatedColumns });
            broadcastUpdate(updatedColumns);
        } catch (error) {
            console.error("Failed to update card content", error);
        } finally {
            set(loadingAtom, false);
        }
    },
);
export const updateCardStatusAtom = atom(
    null,
    async (get, set, { id, status }: { id: number; status: CardStatus }) => {
        set(loadingAtom, true);
        try {
            await trpc.card.editStatusById.mutate({ id, status });

            const currentColumns = get(columnsAtom);
            const updatedColumns = { ...currentColumns };

            let updatedCard;
            Object.keys(updatedColumns).forEach((columnKey) => {
                updatedColumns[columnKey] = updatedColumns[columnKey].filter((card) => {
                    if (card.id === id) {
                        updatedCard = { ...card, status };
                        return false;
                    }
                    return true;
                });
            });

            if (!updatedCard) {
                throw new Error("Card not found in columns, failed to update status");
            }

            updatedColumns[status].push(updatedCard);

            set(columnsAtom, updatedColumns);
            broadcastUpdate(updatedColumns);
        } catch (error) {
            console.error("Failed to update card status", error);
        } finally {
            set(loadingAtom, false);
        }
    },
);

export const getAllCardsAtom = atom(null, async (get, set) => {
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
            const column =
                updatedColumns[CardStatus[card.status as keyof typeof CardStatus]];
            if (!column.some((existingCard) => existingCard.id === card.id)) {
                column.push(card);
            }
        });

        set(columnsAtom, updatedColumns);
        broadcastUpdate(get(columnsAtom));
    } catch (error) {
        console.error("Failed to fetch cards", error);
    } finally {
        set(loadingAtom, false);
    }
});
