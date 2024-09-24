import { PlayerType } from "@/types/player.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { playCard } from "./actions/playCard";
import { CardType } from "@/types/card.type";

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

        updateEnemyDeck(state, action: PayloadAction<{deck: CardType[]}>) {
            state.deck = action.payload.deck
        },

        cardAction(state, action: PayloadAction<{cardId: number}>) {
            playCard(state, action.payload.cardId)
        },

        setCurrentTurn(state) {
            state.mana += 1
        }
    }
})

export const { 
    initialEnemy, 
    updateEnemyMana,
    updateEnemyDeck,
    cardAction, 
} = enemySlice.actions
export default enemySlice.reducer
