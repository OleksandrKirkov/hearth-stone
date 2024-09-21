import { CharacterType } from "./character.type"

export enum CARD_CLASS {
    'taunt',
    'charge',
    'rush'
}

export type CardType = {
    id: number
    data: CharacterType
    class: CARD_CLASS,
    health: number,
    attack: number,
    attackPerTurn: number,
    isAttack: boolean,
    isDeck: boolean,
    mana: number
}

export type UpdateCardType = {
    health: number
    attackPerTurn: number
    isAttack: boolean
}
