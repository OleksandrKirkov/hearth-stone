import { updateGameStatus } from '@/assets/store/reducers/gameSlice'
import {
	deleteCard,
	updateCard,
	updateHero,
} from '@/assets/store/reducers/playerSlice'
import { ActionType } from '@/types/action.type'
import { GAME_STATUS } from '@/types/game.type'
import { IPlayer } from '@/types/player.type'

// Attacker - той хто атакує
// Defender - кого атакують

interface IAttackCardAction extends ActionType {
	attackerId: number
	defenderId: number
}

const attackCardAction = ({
	player,
	dispatch,
	playerType,
	attackerId,
	defenderId,
}: IAttackCardAction) => {
	if (!player || !playerType) return

	const defender: keyof IPlayer =
		playerType === 'player1' ? 'player2' : 'player1'

	const defenderCard = player[defender].deck.find(
		card => card.id === defenderId
	)
	const attackerCard = player[playerType].deck.find(
		card => card.id === attackerId
	)

	if (!defenderCard || !attackerCard || !attackerCard.isAttack) return

	// update attacker card
	dispatch(
		updateCard({
			player: playerType,
			card: {
				...attackerCard,
				isAttack: false,
				attackPerTurn: attackerCard.attackPerTurn - 1,
			},
			cardId: attackerId,
		})
	)

	// update defender card
	dispatch(
		updateCard({
			player: defender,
			card: {
				...defenderCard,
				health: defenderCard.health - attackerCard.attack,
			},
			cardId: defenderId,
		})
	)

	dispatch(
		updateHero({
			player: playerType,
			value: player[playerType].hero + attackerCard.attack,
		})
	)

	if (player[playerType].hero + attackerCard.attack >= 4) {
		dispatch(updateGameStatus({ status: GAME_STATUS.finished }))
	}

	const updatedDefenderCard = player[defender].deck.find(
		card => card.id === defenderId
	)

	if (!updatedDefenderCard) return

	if (updatedDefenderCard.health - attackerCard.attack <= 0) {
		dispatch(
			deleteCard({
				player: defender,
				cardId: defenderId,
			})
		)
	}
}

export default attackCardAction
