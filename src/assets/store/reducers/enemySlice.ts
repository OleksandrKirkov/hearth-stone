import { PlayerType } from "@/types/player.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlayerType = {
    id: 0,
    name: '',
    mana: 0,
    deck: [],
    hero: '',
}

const enemySlice = createSlice({
    name: 'enemy',
    initialState,
    reducers: {
        initialEnemy(_, action: PayloadAction<PlayerType>) {
            return action.payload
        },

        updateMana(state) {
            state.mana += 1
        },
    }
})

export const { initialEnemy, updateMana } = enemySlice.actions
export default enemySlice.reducer
