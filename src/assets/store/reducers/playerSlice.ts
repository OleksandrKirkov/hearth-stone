import { PlayerType } from "@/types/player.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: PlayerType = {
    id: 0,
    name: '',
    mana: 0,
    deck: [],
    hero: '',
}

export const selectPlayer = (state: RootState) => state.player

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
