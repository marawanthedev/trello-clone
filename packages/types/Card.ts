import { CardStatus } from "constants"
import { User } from "./User"

export type Card = {
    content: string,
    status: CardStatus
    author: User;
    userId: number
}