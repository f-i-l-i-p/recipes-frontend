import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import navigationReducer from '../features/navigation/navigationSlice'
import friendsReducer from '../features/friends/friendsSlice'

export const store = configureStore({
    reducer: combineReducers({
        navigation: navigationReducer,
        friends: friendsReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
