import { CardType } from '@/types/card.type'
import { IPlayer, PlayerType } from '@/types/player.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IAttackCard {
	health: number
}

interface IAttackerCard {
	isAttack: boolean
	attackPerTurn: number
}

const initialState: IPlayer = {
	player1: {
		id: 0,
		name: '',
		mana: 0,
		deck: [],
		hero: '',
	},
	player2: {
		id: 1,
		name: '',
		mana: 0,
		deck: [],
		hero: '',
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

		// updatePlayerMana(state) {
		// 	state.mana += 1
		// },

		// updatePlayerDeck(state, action: PayloadAction<{ deck: CardType }>) {
		// 	state.deck.push(action.payload.deck)
		// },

		// updateIsAttack(state) {
		// 	state.deck = state.deck.filter(card => {
		// 		if (card.isDeck == false) card.isAttack = true
		// 		return card
		// 	})
		// },

		// setCurrentTurn(state) {
		// 	state.mana += 1
		// },

		// playCard(state, action: PayloadAction<{ cardId: number }>) {
		// 	playAction(state, action.payload.cardId)
		// },

		// attackCard(
		// 	state,
		// 	action: PayloadAction<{ cardId: number; data: IAttackCard }>
		// ) {
		// 	state.deck = state.deck.filter(card => {
		// 		if (card.id === action.payload.cardId) {
		// 			card.health -= action.payload.data.health
		// 		}

		// 		return card
		// 	})

		// 	state.deck = state.deck.filter(card => card.health > 0)
		// },

		// attackerCard(
		// 	state,
		// 	action: PayloadAction<{ cardId: number; data: IAttackerCard }>
		// ) {
		// 	state.deck = state.deck.filter(card => {
		// 		if (card.id === action.payload.cardId) {
		// 			card.isAttack = action.payload.data.isAttack
		// 			card.attackPerTurn -= action.payload.data.attackPerTurn
		// 		}

		// 		return card
		// 	})

		// 	state.deck = state.deck.filter(card => card.attackPerTurn > 0)
		// },

		updateMana(
			state,
			action: PayloadAction<{ value: number; player: keyof IPlayer }>
		) {
			const { value, player } = action.payload

			state[player].mana = value
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
	},
})

export const {
	initialPlayer,
	// updatePlayerMana,
	// updatePlayerDeck,
	// updateIsAttack,
	// playCard,
	// attackCard,
	// attackerCard,
	updateMana,
	updateCard,
	updateCardItem,
	addCard,
	deleteCard,
} = playerSlice.actions
export default playerSlice.reducer
