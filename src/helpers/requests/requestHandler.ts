import { setCookie, getCookie } from "../cookies";

const URL = process.env.REACT_APP_BACKEND_URL

let token = "";

interface Response<T> {
    status: number,
    data: T,
}

export interface Callback<T = any> {
    onSuccess?: (res: Response<T>) => void,
    onError?: (res: Response<any>) => void,
}

function getToken(): string | null {
    if (token) {
        return token
    } else {
        return getCookie("token")
    }
}

export function setToken(t: string): void {
    token = t
    setCookie("token", t, 365)
}

/**
 * For performing POST requests to the backend.
 * @param route Route to post to.
 * @param callback Called with the server response.
 * @param useToken Specifies if the request should include a token.
 * @param body Optional post body.
 */
export async function post<T>(route: string, callback: Callback<T>, useToken: boolean, body?: any): Promise<void> {
    const headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    if (useToken) {
        headers.append('Authorization', "Bearer " + getToken())
    }

    let response: globalThis.Response;
    try {
        response = await fetch(URL + route, {
            method: "post",
            headers: headers,
            body: JSON.stringify(body)
        })
    } catch (e) {
        callback.onError?.({ status: NaN, data: e })
        return;
    }

    const contentType = response.headers.get("content-type");

    let json;
    if (contentType && contentType.indexOf("application/json") !== -1) {
        json = await response.json();
    } else {
        json = null;
    }

    if (response.ok) {
        callback.onSuccess?.({ status: response.status, data: json })
    } else {
        callback.onError?.({ status: response.status, data: json })
    }
}
