import { router, publicProcedure } from "../trpc";
import { createCardSchema, editCardSchema, IdSchema } from "../schemas";
import { addCard, deleteCard, editCard, getAllCards, getCard } from "../service";

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
    editById: publicProcedure.input(editCardSchema).mutation(async (opts) => {
        const { input: { id, content, status } } = opts;
        const card = await editCard(id, content, status)
        return card;
    }),
});
