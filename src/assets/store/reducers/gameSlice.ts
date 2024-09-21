import { GAME_STATUS, GameType, TURN_STATUS } from "@/types/game.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GameType = {
    status: GAME_STATUS.paused,
    currentTurn: TURN_STATUS.player
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame(state) {
            state.status = GAME_STATUS.active;
        },

        pausedGame(state) {
            state.status = GAME_STATUS.paused;
        },

        finishedGame(state) {
            state.status = GAME_STATUS.finished;
        },

        nextTurn(state) {
            state.currentTurn += 1
        }
    }    
})

export const { startGame, pausedGame, finishedGame, nextTurn } = gameSlice.actions
export default gameSlice.reducer
