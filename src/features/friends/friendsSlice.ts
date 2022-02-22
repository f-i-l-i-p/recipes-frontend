import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Callback } from '../../helpers/requests/requestHandler';
import { listFriendsRequest, searchUsersRequest } from '../../helpers/requests/routes';
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
        setFriends: (state, action: PayloadAction<Friends>) => {
            state.friends = action.payload;
        },
        setSearchResult: (state, action: PayloadAction<User[]>) => {
            state.searchResult = action.payload;
        }
    }
})

export function fetchFriends() {
    return async function fetchFriendsThunk(dispatch: any, getState: any) { // TODO: Fix any type.
        const callback: Callback<any> = {
            onSuccess: (res) => {
                dispatch(setFriends({ // TODO: Fill in data
                    currentFriends: res.data.friends,
                    incomingRequests: res.data.incoming_requests,
                    outgoingRequests: res.data.outgoing_requests,
                }))
            },
            onError: () => {
                dispatch(setFriends({
                    currentFriends: [], incomingRequests: [], outgoingRequests: [],
                }))
            }
        }
        listFriendsRequest(callback)
    }
}

// TODO: Why did I create this function? It is not used and is not working. Remove?
export function searchUsers(searchTerm: string) {
    return async function searchUsersThunk(dispatch: any, getState: any) { // TODO: Fix any type.
        const callback: Callback<any> = {
            onSuccess: () => {
                dispatch(setSearchResult([{ name: "test", id: 3 }]))
            },
            onError: () => {
                dispatch(setSearchResult([]))
            }
        }
        searchUsersRequest(searchTerm, callback)
    }
}

export const { setFriends, setSearchResult } = friendsSlice.actions

export default friendsSlice.reducer