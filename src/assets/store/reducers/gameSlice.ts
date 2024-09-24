import { GAME_STATUS, GameType, TURN_STATUS } from "@/types/game.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { attackCard, IAttack } from "./actions/attackCard";
import { RootState } from "../store";

const initialState: GameType = {
    status: GAME_STATUS.paused,
    currentTurn: TURN_STATUS.player
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
            state.status = isPaused ? GAME_STATUS.active : GAME_STATUS.paused;
        },

        finishedGame(state) {
            state.status = GAME_STATUS.finished;
        },

        attackAction(state, action: PayloadAction<{data: IAttack}>) {
            attackCard(state as unknown as RootState, action.payload.data)
        },

        nextTurn(state, action: PayloadAction<{turn: TURN_STATUS}>) {
            state.currentTurn = action.payload.turn
        }
    },
})

export const { 
    startGame, 
    pausedGame, 
    finishedGame, 
    attackAction,
    nextTurn
} = gameSlice.actions
export default gameSlice.reducer
