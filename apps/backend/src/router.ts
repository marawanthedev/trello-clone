import { router, } from "./trpc";
import { cardRouter, userRouter } from "./routes";

export const appRouter = router({
    user: userRouter,
    card: cardRouter,
});