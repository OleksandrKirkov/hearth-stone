import { CardType } from "./card.type"

export type PlayerType = {
    id: number
    name: string
    mana: number
    deck: CardType[]
    hero: string
}
