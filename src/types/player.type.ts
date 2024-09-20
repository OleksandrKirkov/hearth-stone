import { CharacterType } from "./character.type"

export type PlayerType = {
    id: number
    name: string
    mana: number
    deck: CharacterType[]
    hero: string
}
