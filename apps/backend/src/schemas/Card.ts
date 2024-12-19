import { CardStatus } from '@prisma/client';
import { z } from 'zod';

export const createCardSchema = z.object({
    content: z.string().min(1),
    status: z.nativeEnum(CardStatus),
});

export const editCardContentSchema = z.object({
    id: z.number(),
    content: z.string().min(1),
});
export const editCardStatusSchema = z.object({
    id: z.number(),
    status: z.nativeEnum(CardStatus),
});
