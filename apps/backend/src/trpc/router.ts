import { router, } from ".";
import { cardRouter, userRouter } from "./routes";

export const appRouter = router({
    user: userRouter,
    card: cardRouter,
});