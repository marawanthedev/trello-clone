import { router, publicProcedure } from "../trpc";
import { createCardSchema } from "../schemas";
import { addCard } from "../service";

export const cardRouter = router({
    create: publicProcedure
        .input(createCardSchema)
        .mutation(async (opts: any) => {
            const { input } = opts;
            const addedCard = addCard(input)
            return addedCard
        }),
});
