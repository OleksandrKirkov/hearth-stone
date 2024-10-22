import {
	updateEnemyDeck,
	updateEnemyMana,
} from '@/assets/store/reducers/enemySlice'
import { nextTurn as nextTurnReducer } from '@/assets/store/reducers/gameSlice'
import {
	updatePlayerDeck,
	updatePlayerMana,
} from '@/assets/store/reducers/playerSlice'
import { DECK_LENGTH } from '@/contstants/game'
import useDeck from '@/hooks/useDeck'
import { CardType } from '@/types/card.type'
import { GameType, TURN_STATUS } from '@/types/game.type'
import { PlayerType } from '@/types/player.type'
import { Dispatch } from '@reduxjs/toolkit'

interface INextTurn {
	player: PlayerType
	enemy: PlayerType
	game: GameType
	dispatch: Dispatch
}

const setIsAttack = (card: CardType): CardType => {
	!card.isDeck && (card.isAttack = true)

	return card
}

const nextTurn = async ({ player, enemy, game, dispatch }: INextTurn) => {
	const { updateDeck } = useDeck()

	const isPlayerTurn = game.currentTurn === TURN_STATUS.player

	if (isPlayerTurn) {
		dispatch(nextTurnReducer({ turn: TURN_STATUS.enemy }))

		if (enemy.deck.filter(card => card.isDeck).length < DECK_LENGTH) {
			const card = await updateDeck()
			if (card) dispatch(updateEnemyDeck({ deck: card }))
		}

		dispatch(updateEnemyMana())
	} else {
		dispatch(nextTurnReducer({ turn: TURN_STATUS.player }))

		if (player.deck.filter(card => card.isDeck).length < DECK_LENGTH) {
			const card = await updateDeck()
			if (card) dispatch(updatePlayerDeck({ deck: card }))
		}

		dispatch(updatePlayerMana())
	}
}

export default nextTurn
