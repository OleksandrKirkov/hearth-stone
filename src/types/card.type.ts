import { CharacterType } from "./character.type"

enum CARD_CLASS {
    'taunt',
    'charge',
    'rush'
}

export type CardType = {
    data: CharacterType
    class: CARD_CLASS,
    health: number,
    attack: number,
    attackPerTurn: number,
    isDeck: boolean
}
