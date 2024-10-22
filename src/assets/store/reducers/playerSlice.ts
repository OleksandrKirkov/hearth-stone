import { CardType } from '@/types/card.type'
import { PlayerType } from '@/types/player.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { playCard as playAction } from './actions/playCard'

interface IAttackCard {
	health: number
}

interface IAttackerCard {
	isAttack: boolean
	attackPerTurn: number
}

const initialState: PlayerType = {
	id: 0,
	name: '',
	mana: 0,
	deck: [],
	hero: '',
}

export const selectPlayer = (state: RootState) => state.player

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		initialPlayer(_, action: PayloadAction<PlayerType>) {
			return action.payload
		},

		updatePlayerMana(state) {
			state.mana += 1
		},

		updatePlayerDeck(state, action: PayloadAction<{ deck: CardType }>) {
			state.deck.push(action.payload.deck)
		},

		setCurrentTurn(state) {
			state.mana += 1
		},

		playCard(state, action: PayloadAction<{ cardId: number }>) {
			playAction(state, action.payload.cardId)
		},

		attackCard(
			state,
			action: PayloadAction<{ cardId: number; data: IAttackCard }>
		) {
			state.deck = state.deck.filter(card => {
				if (card.id === action.payload.cardId) {
					card.health -= action.payload.data.health
				}

				return card
			})
		},

		attackerCard(
			state,
			action: PayloadAction<{ cardId: number; data: IAttackerCard }>
		) {
			state.deck = state.deck.filter(card => {
				if (card.id === action.payload.cardId) {
					card.isAttack = action.payload.data.isAttack
					card.attackPerTurn -= action.payload.data.attackPerTurn
				}

				return card
			})
		},
	},
})

export const {
	initialPlayer,
	updatePlayerMana,
	updatePlayerDeck,
	playCard,
	attackCard,
	attackerCard,
} = playerSlice.actions
export default playerSlice.reducer
