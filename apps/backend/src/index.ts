import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from './trpc/router';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
