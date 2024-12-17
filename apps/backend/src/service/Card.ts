import { Card } from "packages/types"
import { Prisma } from '@prisma/client';
import { prisma } from "../prisma";


export const addCard = (card: Prisma.CardCreateInput) => prisma.card.create({ data: card })