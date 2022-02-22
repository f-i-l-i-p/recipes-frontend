import Ingredient, { Recipe } from "../../types/ingredient";
import { post, Callback, setToken } from "./requestHandler";

export async function createAccountRequest(userName: string, email: string, password: string, callback: Callback): Promise<void> {
    post("users/create", callback, false, {
        user_name: userName,
        email: email,
        password: password,
    })
}

export async function checkTokenRequest(callback: Callback): Promise<void> {
    post("auth/check", callback, true)
}

export async function loginRequest(email: string, password: string, callback: Callback): Promise<void> {
    // Callback that extracts the token, and then calls the regular callback
    const loginCallback: Callback = {
        onSuccess: (res) => {
            setToken(res.data.token);
            callback.onSuccess?.(res);
        },
        onError: callback.onError,
    }

    post("auth/login", loginCallback, false, {
        email: email,
        password: password,
    })
}

export async function logoutRequest(callback: Callback): Promise<void> {
    post("auth/logout", callback, true)
}

export async function uploadRecipeRequest(name: string, ingredients: Ingredient[], instructions: string[], imageBase64: string | null, callback: Callback): Promise<void> {
    post("recipes/create", callback, true, {
        name: name,
        ingredients: ingredients,
        instructions: instructions,
        image: imageBase64,
    })
}

export async function changeRecipeRequest(recipeId: number, name: string, ingredients: Ingredient[], instructions: string[], imageBase64: string | null, callback: Callback): Promise<void> {
    post("recipes/change", callback, true, {
        id: recipeId,
        name: name,
        ingredients: ingredients,
        instructions: instructions,
        image: imageBase64,
    })
}

export async function deleteRecipeRequest(recipeId: number, callback: Callback): Promise<void> {
    post("recipes/delete", callback, true, {
        id: recipeId,
    })
}

export async function latestRecipesRequest(searchTerm: string | null, callback: Callback): Promise<void> {
    let body;
    if (searchTerm) {
        body = { match: searchTerm }
    } else {
        body = {}
    }

    post("recipes/latest", callback, true, body)
}

export async function recipeRequest(id: number, callback: Callback<Recipe>): Promise<void> {
    post("recipes/get", callback, true, {
        id: id,
    })
}

export async function searchUsersRequest(searchTerm: string, callback: Callback): Promise<void> {
    post("users/search", callback, true, {
        search_term: searchTerm,
    })
}

export async function listFriendsRequest(callback: Callback): Promise<void> {
    post("friends/list-friends", callback, true)
}

export async function createFriendRequest(friend_id: number, callback: Callback): Promise<void> {
    post("friends/create-friend-request", callback, true, {
        id: friend_id,
    })
}

export async function cancelFriendRequest(friend_id: number, callback: Callback): Promise<void> {
    post("friends/cancel-friend-request", callback, true, {
        id: friend_id,
    })
}

export async function acceptFriendRequest(friend_id: number, callback: Callback): Promise<void> {
    post("friends/accept-friend-request", callback, true, {
        id: friend_id,
    })
}

export async function removeFriendRequest(friend_id: number, callback: Callback): Promise<void> {
    post("friends/remove-friend", callback, true, {
        id: friend_id,
    })
}