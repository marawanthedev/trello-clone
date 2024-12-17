import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { db } from './db';
import { publicProcedure, router } from './trpc';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from "@trpc/server/adapters/express"

const app = express();

const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(input);
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts: any) => {
      const { input } = opts;
      const user = await db.user.create(input);
      return user;
    }),
});


const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from your frontend's URL
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

app.use(cors(corsOptions));



app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => {
      return {}
    },
  })
)

const port = 3000;

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});


export type AppRouter = typeof appRouter;
