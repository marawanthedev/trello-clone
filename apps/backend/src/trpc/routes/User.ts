import { createUserSchema, IdSchema, } from "../../schemas";
import { addUser, getUser } from "../../service";
import { router, publicProcedure } from "..";

export const userRouter = router({
    getById: publicProcedure.input(IdSchema).query(async (opts) => {
        const { input: { id } } = opts;
        const user = await getUser(id)
        return user;
    }),
    create: publicProcedure.input(createUserSchema).mutation(async (opts: any) => {
        const { input } = opts;
        const addedUser = addUser(input)
        return addedUser
    }),

});
