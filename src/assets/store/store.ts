import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import gameReducer from "@/assets/store/reducers/gameSlice"
import playerReducer from "@/assets/store/reducers/playerSlice"
import enemyReducer from "@/assets/store/reducers/enemySlice"

export const store = configureStore({
    reducer: {
        game: gameReducer,
        player: playerReducer,
        enemy: enemyReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
