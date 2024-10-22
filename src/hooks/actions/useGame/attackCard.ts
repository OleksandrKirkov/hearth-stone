import { CardType } from '@/types/card.type'
import { GameType, TURN_STATUS } from '@/types/game.type'
import { PlayerType } from '@/types/player.type'
import { Dispatch } from '@reduxjs/toolkit'

import {
	attackCard as attackCardEnemy,
	attackerCard as attackerCardEnemy,
} from '@/assets/store/reducers/enemySlice'
import {
	attackCard as attackCardPlayer,
	attackerCard as attackerCardPlayer,
} from '@/assets/store/reducers/playerSlice'

interface IAttackCard {
	player: PlayerType
	enemy: PlayerType
	game: GameType
	attackerCardId: number
	targetCardId: number
	dispatch: Dispatch
}

const getCardById = (cardId: number, deck: CardType[]) => {
	return deck.find(card => card.id === cardId)
}

const attackCard = ({
	player,
	enemy,
	game,
	attackerCardId,
	targetCardId,
	dispatch,
}: IAttackCard) => {
	const isAttackPlayer = game.currentTurn === TURN_STATUS.player

	const playerDeck = player.deck
	const enemyDeck = enemy.deck

	const attackerCard = getCardById(
		attackerCardId,
		isAttackPlayer ? playerDeck : enemyDeck
	)

	const targetCard = getCardById(
		targetCardId,
		isAttackPlayer ? enemyDeck : playerDeck
	)

	if (attackerCard && targetCard && attackerCard.isAttack) {
		if (isAttackPlayer) {
			dispatch(
				attackerCardPlayer({
					cardId: attackerCard.id,
					data: {
						isAttack: false,
						attackPerTurn: 1,
					},
				})
			)
			dispatch(
				attackCardEnemy({
					cardId: targetCard.id,
					data: {
						health: attackerCard.attack,
					},
				})
			)
		} else {
			dispatch(
				attackerCardEnemy({
					cardId: attackerCard.id,
					data: {
						isAttack: false,
						attackPerTurn: 1,
					},
				})
			)
			dispatch(
				attackCardPlayer({
					cardId: targetCard.id,
					data: {
						health: attackerCard.attack,
					},
				})
			)
		}
	}
}

export default attackCard
