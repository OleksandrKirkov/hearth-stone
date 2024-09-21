import { GAME_STATUS, GameType, TURN_STATUS } from "@/types/game.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { attackCard, IAttack } from "./actions/attackCard";
import { RootState } from "../store";
import { nextTurn } from "./actions/nextTurn"

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

        turnAction(state) {
            nextTurn(state as unknown as RootState)
        },

        attackAction(state, action: PayloadAction<{data: IAttack}>) {
            attackCard(state as unknown as RootState, action.payload.data)
        }
    }    
})

export const { startGame, pausedGame, finishedGame, turnAction, attackAction } = gameSlice.actions
export default gameSlice.reducer
