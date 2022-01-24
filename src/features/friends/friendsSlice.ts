import { AnyAction, createSlice, PayloadAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { User } from '../../types/ingredient';
import { Friends } from './types';

interface FriendsState {
    friends: Friends,
    searchResult: User[],
}

const initialState: FriendsState = {
    friends: {
        currentFriends: [],
        incomingRequests: [],
        outgoingRequests: [],
    },
    searchResult: [],
}

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialState,
    reducers: {
        sendFriendRequest: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
        },
        acceptFriendRequest: (state, action: PayloadAction<string>) => {

        },
        cancelFriendRequest: (state, action: PayloadAction<string>) => {

        },
        removeFriend: (state, action: PayloadAction<string>) => {

        },
        setSearchResult: (state, action: PayloadAction<User[]>) => {
            state.searchResult = action.payload;
        }
    } 
})

export function fetchFriends() {
    return async function fetchFriendsThunk(dispatch: any, getState: any) { // TODO: Fix any type.
        // TODO: Fetch data.
        dispatch(sendFriendRequest("Test"));
    }
}

export function searchUsers(searchTerm: string) {
    return async function searchUsersThunk(dispatch: any, getState: any) { // TODO: Fix any type.
        dispatch(setSearchResult([{name: "test", id: 3}]))
    }
}

export const { sendFriendRequest, acceptFriendRequest, cancelFriendRequest, removeFriend, setSearchResult } = friendsSlice.actions

export default friendsSlice.reducer