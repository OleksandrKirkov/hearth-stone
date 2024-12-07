import {
	finishedGame,
	pausedGame,
	startGame,
} from '@/assets/store/reducers/gameSlice'
import { ActionType } from '@/types/action.type'
import { GAME_STATUS } from '@/types/game.type'

interface IUpdateStateAction extends ActionType {
	status: GAME_STATUS
}

const updateStatusAction = ({ dispatch, status }: IUpdateStateAction) => {
	if (status === GAME_STATUS.active) {
		dispatch(startGame())
	}

	switch (status) {
		case GAME_STATUS.active:
			dispatch(startGame())
			break
		case GAME_STATUS.paused:
			dispatch(pausedGame())
			break
		case GAME_STATUS.finished:
			dispatch(finishedGame())
			break
	}
}

export default updateStatusAction
