import { RootState } from '@/assets/store/store'
import { GAME_STATUS } from '@/types/game.type'
import { updateStatusAction } from './actions/gameActions'
import nextTurnAction from './actions/gameActions/nextTurnAction'
import initPlayerAction from './actions/playerActions/initPlayerAction'
import { useAppDispatch, useAppSelector } from './useRedux'

const useGame = () => {
	const dispatch = useAppDispatch()
	const { player, game } = useAppSelector((state: RootState) => state)

	const startGame = async () => {
		initPlayerAction({ dispatch })

		updateStatusAction({ dispatch, status: GAME_STATUS.active })
	}

	const nextTurn = () => {
		console.log('next turn')
		nextTurnAction({ player, game, dispatch })
	}

	return { startGame, nextTurn }
}

export default useGame
