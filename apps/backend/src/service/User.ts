import { Prisma } from "@prisma/client"
import { prisma } from "../prisma"

export const addUser = (user: Prisma.UserCreateInput) => {
    try {
        prisma.user.create({ data: user })
    }
    catch (error) {
        console.error("Error creating user", error);
        throw new Error("Error creating user");
    }
}

export const getUser = (id: number) => {
    try {
        const user = prisma.user.findUniqueOrThrow({ where: { id } });
        return user;
    } catch (error) {
        console.error(`Error getting user with id: ${id}`, error);
        throw new Error(`Error getting user with id: ${id}`);
    }
}

