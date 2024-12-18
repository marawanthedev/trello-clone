import { router, publicProcedure } from "../trpc";
import { createCardSchema, IdSchema } from "../schemas";
import { addCard, deleteCard, getAllCards, getCard } from "../service";

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
});
