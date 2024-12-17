import { Prisma } from "@prisma/client"
import { prisma } from "../prisma"

export const addUser = (user: Prisma.UserCreateInput) => prisma.user.create({ data: user })

export const getUser = (id: number) => prisma.user.findUniqueOrThrow({ where: { id } })

