import { router, publicProcedure } from "../trpc";
import { createCardSchema, editCardContentSchema, editCardStatusSchema, IdSchema } from "../schemas";
import { addCard, deleteCard, editCardContent, editCardStatus, getAllCards, getCard } from "../service";

export const cardRouter = router({
    create: publicProcedure
        .input(createCardSchema)
        .mutation(async (opts: any) => {
            const { input } = opts;
            const addedCard = addCard(input)
            return addedCard
        }),
    getById: publicProcedure.input(IdSchema).query(async (opts) => {
        const { input: { id } } = opts;
        const card = await getCard(id)
        return card;
    }),
    deleteById: publicProcedure.input(IdSchema).mutation(async (opts) => {
        const { input: { id } } = opts;
        const card = await deleteCard(id)
        return card;
    }),
    getAll: publicProcedure.query(async (opts) => {
        const cards = await getAllCards()
        return cards;
    }),
    editContentById: publicProcedure.input(editCardContentSchema).mutation(async (opts) => {
        const { input: { id, content } } = opts;
        const card = await editCardContent(id, content)
        return card;
    }),
    editStatusById: publicProcedure.input(editCardStatusSchema).mutation(async (opts) => {
        const { input: { id, status } } = opts;
        const card = await editCardStatus(id, status)
        return card;
    }),
});
