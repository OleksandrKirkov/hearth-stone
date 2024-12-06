import { CardType } from './card.type'

export type PlayerType = {
	id: number
	name: string
	mana: number
	deck: CardType[]
	hero: string
}

export interface IPlayer {
	player1: PlayerType
	player2: PlayerType
}
