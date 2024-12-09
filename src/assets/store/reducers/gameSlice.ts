import { GAME_STATUS, GameType, TURN_STATUS } from '@/types/game.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: GameType = {
	status: GAME_STATUS.paused,
	currentTurn: TURN_STATUS.PLAYER,
}

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		startGame(state) {
			state.status = GAME_STATUS.active
		},

		pausedGame(state) {
			const isPaused = state.status === GAME_STATUS.paused
			state.status = isPaused ? GAME_STATUS.active : GAME_STATUS.paused
		},

		finishedGame(state) {
			state.status = GAME_STATUS.finished
		},

		nextTurn(state, action: PayloadAction<{ turn: TURN_STATUS }>) {
			state.currentTurn = action.payload.turn
		},

		updateGameStatus(state, action: PayloadAction<{ status: GAME_STATUS }>) {
			state.status = action.payload.status
		},

		updateTurn(state, action: PayloadAction<{ turn: TURN_STATUS }>) {
			state.currentTurn = action.payload.turn
		},
	},
})

export const {
	startGame,
	pausedGame,
	finishedGame,
	nextTurn,
	updateGameStatus,
	updateTurn,
} = gameSlice.actions
export default gameSlice.reducer
