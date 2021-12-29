import Ingredient from "../types/ingredient";

const URL = "https://recipes-backend-heroku.herokuapp.com/";

let token = "";

interface RequestListener {
    onSuccess: (json: any) => void,
    onError: (json: any) => void,
}

async function request(route: string, body: any, includeToken: boolean, listener: RequestListener): Promise<void> {
    const headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    if (includeToken) {
        headers.append('Authorization', "Bearer " + token)
    }

    const response = await fetch(URL + route, {
        method: "post",
        headers: headers,
        body: JSON.stringify(body)
    })

    const contentType = response.headers.get("content-type");

    let json;
    if (contentType && contentType.indexOf("application/json") !== -1) {
        json = await response.json();
    } else {
        json = null;
    }

    if (response.ok) {
        listener.onSuccess(json)
    } else {
        listener.onError(json)
    }
}

export async function createAccountRequest(userName: string, email: string, password: string, listener: RequestListener): Promise<void> {
    request(
        "/users/create",
        {
            user_name: userName,
            email: email,
            password: password,
        },
        false,
        listener
    )
}

export async function loginRequest(email: string, password: string, listener: RequestListener): Promise<void> {
    // Listener that extracts the token, and then calls the regular listener
    const loginListener = {
        onSuccess: (json: any) => {
            token = json.token;
            listener.onSuccess(json);
        },
        onError: listener.onError,
    }

    request(
        "/auth/login",
        {
            email: email,
            password: password,
        },
        false,
        loginListener
    )
}

export async function uploadRecipeRequest(name: string, ingredients: Ingredient[], instructions: string[], imageBase64: string | null, listener: RequestListener): Promise<void> {
    request(
        "/recipes/create",
        {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            image: imageBase64,
        },
        true,
        listener,
    )
}

export async function latestRecipesRequest(searchTerm: string | null, listener: RequestListener): Promise<void> {
    let body;
    if (searchTerm) {
        body = { math: searchTerm }
    } else {
        body = {}
    }

    request(
        "/recipes/latest",
        body,
        true,
        listener,
    )
}

export async function recipeRequest(id: number, listener: RequestListener): Promise<void> {
    request(
        "/recipes/get",
        {
            id: id,
        },
        true,
        listener
    )
}
