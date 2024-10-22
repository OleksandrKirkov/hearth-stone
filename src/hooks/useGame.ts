import { initialEnemy } from '@/assets/store/reducers/enemySlice'
import { startAction as startGameReducer } from '@/assets/store/reducers/gameSlice'
import {
	initialPlayer,
	playCard as playCardReducer,
} from '@/assets/store/reducers/playerSlice'
import { RootState } from '@/assets/store/store'
import { PLAYER_NAME, START_MANA } from '@/contstants/game'
import attackCardReducer from '@/hooks/actions/useGame/attackCard'
import nextTurnAction from './actions/useGame/nextTurn'
import useDeck from './useDeck'
import { useAppDispatch, useAppSelector } from './useRedux'

const useGame = () => {
	const dispatch = useAppDispatch()
	const { player, enemy, game } = useAppSelector((state: RootState) => state)
	const { getDeck } = useDeck()

	const startGame = async () => {
		dispatch(
			initialPlayer({
				id: 0,
				name: PLAYER_NAME,
				mana: 1,
				deck: await getDeck(),
				hero: '',
			})
		)

		dispatch(
			initialEnemy({
				id: 1,
				name: 'Opponent',
				mana: START_MANA,
				deck: await getDeck(),
				hero: '',
			})
		)

		dispatch(startGameReducer())
	}

	const playCard = (id: number) => {
		dispatch(playCardReducer({ cardId: id }))
	}

	const nextTurn = () => {
		nextTurnAction({ player, game, enemy, dispatch })
	}

	const attackCard = (attackerCardId: number, targetCardId: number) => {
		attackCardReducer({
			player,
			game,
			enemy,
			dispatch,
			attackerCardId,
			targetCardId,
		})
	}

	return { startGame, nextTurn, attackCard, playCard }
}

export default useGame
