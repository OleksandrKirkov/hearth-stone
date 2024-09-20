import { GameType } from "@/types/game.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GameType = {
    status: 'paused',
    currentTurn: 0
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame(state) {
            state.status = 'active';
            state.currentTurn = 1
        },

        pausedGame(state) {
            state.status = 'paused';
        },

        finishedGame(state) {
            state.status = 'finished';
        },

        nextTurn(state) {
            state.currentTurn += 1
        }
    }    
})

export const { startGame, pausedGame, finishedGame, nextTurn } = gameSlice.actions
export default gameSlice.reducer
