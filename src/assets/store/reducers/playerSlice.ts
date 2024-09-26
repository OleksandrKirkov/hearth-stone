import { PlayerType } from "@/types/player.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardType } from "@/types/card.type";
import { playCard as playAction } from "./actions/playCard";

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

        updatePlayerDeck(state, action: PayloadAction<{deck: CardType[]}>) {
            state.deck = action.payload.deck
        },

        setCurrentTurn(state) {
            state.mana += 1
        },

        playCard(state, action: PayloadAction<{cardId: number}>) {
            playAction(state, action.payload.cardId)
        }
    }
})

export const { 
    initialPlayer,
    updatePlayerMana,
    updatePlayerDeck,
    playCard,
} = playerSlice.actions
export default playerSlice.reducer
