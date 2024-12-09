import { CharacterType } from './character.type'

export enum CARD_CLASS {
	RUSH = 'Rush',
	CHARGE = 'Charge',
	TAUNT = 'Taunt',
}

export type CardType = {
	id: number
	data: CharacterType
	class: CARD_CLASS
	health: number
	attack: number
	attackPerTurn: number
	isAttack: boolean
	isDeck: boolean
	mana: number
}

export type UpdateCardType = {
	health: number
	attackPerTurn: number
	isAttack: boolean
}
