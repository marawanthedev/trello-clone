import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'backend/src';

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc/',
        }),
    ],
});


export default trpc;