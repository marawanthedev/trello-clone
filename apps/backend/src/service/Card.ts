import { CardStatus, Prisma } from '@prisma/client';
import { prisma } from "../prisma";


export const addCard = (card: Prisma.CardCreateInput) => {
    try {
        return prisma.card.create({ data: card })
    }
    catch (error) {
        console.error("Error creating card", error);
        throw new Error("Error creating card");
    }
}

export const getCard = (id: number) => {
    try {
        return prisma.card.findUniqueOrThrow({ where: { id } })
    }
    catch (error) {
        console.error(`Error fetching card with id of ${id}`, error);
        throw new Error(`Error fetching card with id of ${id}`);
    }
}


export const getAllCards = async () => {
    try {
        return await prisma.card.findMany();
    } catch (error) {
        console.error("Error fetching cards: ", error);
        throw new Error("Failed to fetch cards");
    }
};


export const deleteCard = async (id: number) => {
    try {
        return await prisma.card.delete({ where: { id } })
    } catch (error) {
        console.error(`Error deleting card with id of ${id}`, error);
        throw new Error(`Error deleting card with id of ${id}`);
    }
};

export const editCard = async (id: number, content: string, status: CardStatus) => {
    try {
        return await prisma.card.update({
            where: {
                id: id,
            },
            data: { content, status },
        })
    } catch (error) {
        console.error(`Error updating card with id of ${id}`, error);
        throw new Error(`Error updating card with id of ${id}`);
    }
};