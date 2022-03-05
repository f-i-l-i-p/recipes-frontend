import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { latestRecipesRequest } from '../../helpers/requests/routes';
import { RecipeListItem } from '../../helpers/requests/types';


interface RecipeListState {
    recipes: RecipeListItem[],
    isLoading: boolean,
}

const initialState: RecipeListState = {
    recipes: [],
    isLoading: false,
}

export const recipeListSlice = createSlice({
    name: 'recipeList',
    initialState: initialState,
    reducers: {
        fetchStart: (state) => {
            state.isLoading = true
        },
        fetchSuccess: (state, action: PayloadAction<RecipeListItem[]>) => {
            state.recipes = action.payload;
            state.isLoading = false
        },
        fetchError: (state) => {
            state.isLoading = false
        }
    }
})

/**
 * Fetches recipes in the background without setting isLoading to true.
 */
export function fetchRecipesBackground() {
    return async function fetchRecipesThunk(dispatch: any, getState: any) {
        latestRecipesRequest(undefined, {
            onSuccess: (res) => {
                dispatch(fetchSuccess(res.data.result))
            },
            onError: () => {
                dispatch(fetchError())
            }
        })
    }
}

/**
 * Fetches recipes with an optional parameter for specifying a search string.
 * @param search Optional search string.
 */
export function fetchRecipes(search?: string) {
    return async function fetchRecipesThunk(dispatch: any, getState: any) {
        dispatch(fetchStart())

        latestRecipesRequest(search, {
            onSuccess: (res) => {
                dispatch(fetchSuccess(res.data.result))
            },
            onError: () => {
                dispatch(fetchError())
            }
        })
    }
}

const { fetchStart, fetchSuccess, fetchError } = recipeListSlice.actions

export default recipeListSlice.reducer