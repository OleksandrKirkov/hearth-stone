import { GAME_STATUS, GameType, TURN_STATUS } from "@/types/game.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GameType = {
    status: GAME_STATUS.paused,
    currentTurn: TURN_STATUS.player
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startAction(state) {
            state.status = GAME_STATUS.active
        },

        pausedGame(state) {
            const isPaused = state.status === GAME_STATUS.paused
            state.status = isPaused ? GAME_STATUS.active : GAME_STATUS.paused;
        },

        finishedGame(state) {
            state.status = GAME_STATUS.finished;
        },

        nextTurn(state, action: PayloadAction<{turn: TURN_STATUS}>) {
            state.currentTurn = action.payload.turn
        }
    },
})

export const { 
    startAction, 
    pausedGame, 
    finishedGame, 
    nextTurn
} = gameSlice.actions
export default gameSlice.reducer
