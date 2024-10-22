import { CardType } from '@/types/card.type'
import { PlayerType } from '@/types/player.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { playCard as playCardAction } from './actions/playCard'

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

export const selectEnemy = (state: RootState) => state.enemy

const enemySlice = createSlice({
	name: 'enemy',
	initialState,
	reducers: {
		initialEnemy(_, action: PayloadAction<PlayerType>) {
			return action.payload
		},

		updateEnemyMana(state) {
			state.mana += 1
		},

		updateEnemyDeck(state, action: PayloadAction<{ deck: CardType }>) {
			state.deck.push(action.payload.deck)
		},

		playCard(state, action: PayloadAction<{ cardId: number }>) {
			playCardAction(state, action.payload.cardId)
		},

		setCurrentTurn(state) {
			state.mana += 1
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

			state.deck = state.deck.filter(card => card.health > 0)
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

			state.deck = state.deck.filter(card => card.health > 0)
		},
	},
})

export const {
	initialEnemy,
	updateEnemyMana,
	updateEnemyDeck,
	playCard,
	attackCard,
	attackerCard,
} = enemySlice.actions
export default enemySlice.reducer
