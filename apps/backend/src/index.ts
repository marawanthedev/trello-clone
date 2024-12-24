import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from './trpc/router';

const app = express();

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = ['http://localhost:8080'];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
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
