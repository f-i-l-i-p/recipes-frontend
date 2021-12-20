const URL = "http://127.0.0.1:5000";

interface RequestListener {
    onSuccess: (json: any) => void,
    onError: (json: any) => void,
}

async function request(route: string, body: any, listener: RequestListener) {
    const response = await fetch(URL + route, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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

export async function createAccount(userName: string, email: string, password: string, listener: RequestListener) {
    request(
        "/users/create",
        {
            user_name: userName,
            email: email,
            password: password,
        },
        listener
    )
}

export async function login(email: string, password: string, listener: RequestListener) {
    request(
        "/auth/login",
        {
            email: email,
            password: password,
        },
        listener
    )
}