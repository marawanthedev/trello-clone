import { router, publicProcedure } from "../trpc";
import { createCardSchema, getByIdSchema } from "../schemas";
import { addCard, getCard } from "../service";

export const cardRouter = router({
    create: publicProcedure
        .input(createCardSchema)
        .mutation(async (opts: any) => {
            const { input } = opts;
            const addedCard = addCard(input)
            return addedCard
        }),
    getById: publicProcedure.input(getByIdSchema).query(async (opts) => {
        const { input: { id } } = opts;
        const card = await getCard(id)
        return card;
    }),
});
