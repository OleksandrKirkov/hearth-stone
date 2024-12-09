import { updateGameStatus } from '@/assets/store/reducers/gameSlice'
import { updateCard, updateHero } from '@/assets/store/reducers/playerSlice'
import { ActionType } from '@/types/action.type'
import { GAME_STATUS } from '@/types/game.type'
import { IPlayer } from '@/types/player.type'

interface IAttackHeroAction extends ActionType {
	attackerId: number
}

const attackHeroAction = ({
	player,
	playerType,
	dispatch,
	attackerId,
}: IAttackHeroAction) => {
	if (!player || !playerType) return

	const defenderHero: keyof IPlayer =
		playerType === 'player1' ? 'player2' : 'player1'

	const attackerCard = player[playerType].deck.find(
		card => card.id === attackerId
	)

	if (!attackerCard || !attackerCard.isAttack) return

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

	dispatch(
		updateHero({
			player: defenderHero,
			value: player[defenderHero].hero - attackerCard.attack,
		})
	)

	if (player[defenderHero].hero - attackerCard.attack <= 0) {
		dispatch(updateGameStatus({ status: GAME_STATUS.finished }))
	}
}

export default attackHeroAction
