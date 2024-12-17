import { CardStatus } from '@prisma/client';
import { z } from 'zod';

export const createCardSchema = z.object({
    content: z.string().min(1),
    status: z.nativeEnum(CardStatus),
    userId: z.number().int().positive(),
});