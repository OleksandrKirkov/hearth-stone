import { CardType } from './card.type'

export type PlayerType = {
	id: number
	name: string
	mana: number
	deck: CardType[]
	hero: number
}

export interface IPlayer {
	player1: PlayerType
	player2: PlayerType
}
