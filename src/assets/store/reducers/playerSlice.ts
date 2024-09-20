import { PlayerType } from "@/types/player.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlayerType = {
    id: 0,
    name: '',
    mana: 0,
    deck: [],
    hero: '',
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        initialPlayer(_, action: PayloadAction<PlayerType>) {
            return action.payload
        },

        updatePlayerMana(state) {
            state.mana += 1
        },
    }
})

export const { initialPlayer, updatePlayerMana } = playerSlice.actions
export default playerSlice.reducer
