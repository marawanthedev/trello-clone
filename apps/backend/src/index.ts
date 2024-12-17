import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from './router';

const app = express();

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
