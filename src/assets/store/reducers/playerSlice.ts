import { CardType } from '@/types/card.type'
import { IPlayer, PlayerType } from '@/types/player.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: IPlayer = {
	player1: {
		id: 0,
		name: '',
		mana: 0,
		deck: [],
		hero: 0,
	},
	player2: {
		id: 1,
		name: '',
		mana: 0,
		deck: [],
		hero: 0,
	},
}

export const selectPlayer = (state: RootState) => state.player

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		initialPlayer(
			state,
			action: PayloadAction<{ data: PlayerType; player: keyof IPlayer }>
		) {
			const { player, data } = action.payload

			state[player] = data
		},

		updateMana(
			state,
			action: PayloadAction<{ value: number; player: keyof IPlayer }>
		) {
			const { value, player } = action.payload

			state[player].mana = value
		},

		updateCards(
			state,
			action: PayloadAction<{ player: keyof IPlayer; cards: CardType[] }>
		) {
			const { player, cards } = action.payload

			state[player].deck = cards
		},

		updateCard(
			state,
			action: PayloadAction<{
				player: keyof IPlayer
				card: CardType
				cardId: number
			}>
		) {
			const { player, card, cardId } = action.payload

			state[player].deck = state[player].deck.map(item => {
				if (item.id === cardId) {
					return { ...card }
				} else return item
			})
		},

		updateCardItem(
			state,
			action: PayloadAction<{
				player: keyof IPlayer
				item: { [key in keyof CardType]: unknown }
				cardId: number
			}>
		) {
			const { player, item, cardId } = action.payload

			state[player].deck = state[player].deck.map(card => {
				if (card.id === cardId) {
					return { ...card, item }
				} else return card
			})
		},

		addCard(
			state,
			action: PayloadAction<{ player: keyof IPlayer; card: CardType }>
		) {
			const { player, card } = action.payload

			state[player].deck = [...state[player].deck, card]
		},

		deleteCard(
			state,
			action: PayloadAction<{ player: keyof IPlayer; cardId: number }>
		) {
			const { player, cardId } = action.payload

			state[player].deck = state[player].deck.filter(card => card.id !== cardId)
		},

		updateHero(
			state,
			action: PayloadAction<{ player: keyof IPlayer; value: number }>
		) {
			const { player, value } = action.payload

			state[player].hero = value
		},
	},
})

export const {
	updateHero,
	initialPlayer,
	updateMana,
	updateCard,
	updateCardItem,
	addCard,
	deleteCard,
	updateCards,
} = playerSlice.actions
export default playerSlice.reducer
