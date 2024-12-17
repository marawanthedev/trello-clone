import { db } from "../db";
import { router, publicProcedure } from "../trpc";
import { z } from 'zod';

export const userRouter = router({
    listAll: publicProcedure.query(async () => {
        const users = await db.user.findMany();
        console.log({ users })
        return users;
    }),
    getById: publicProcedure.input(z.string()).query(async (opts) => {
        const { input } = opts;
        const user = await db.user.findById(input);
        return user;
    }),

});
