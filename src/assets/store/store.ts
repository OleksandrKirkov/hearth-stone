import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import gameReducer from "@/assets/store/reducers/gameSlice"

export const store = configureStore({
    reducer: {
        game: gameReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
