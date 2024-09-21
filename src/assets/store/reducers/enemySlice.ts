import { PlayerType } from "@/types/player.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { playCard } from "./actions/playCard";

const initialState: PlayerType = {
    id: 0,
    name: '',
    mana: 0,
    deck: [],
    hero: '',
}

export const selectEnemy = (state: RootState) => state.enemy

const enemySlice = createSlice({
    name: 'enemy',
    initialState,
    reducers: {
        initialEnemy(_, action: PayloadAction<PlayerType>) {
            return action.payload
        },

        updateEnemyMana(state) {
            state.mana += 1
        },

        cardAction(state, action: PayloadAction<{cardId: number}>) {
            playCard(state, action.payload.cardId)
        }
    }
})

export const { initialEnemy, updateEnemyMana, cardAction } = enemySlice.actions
export default enemySlice.reducer
