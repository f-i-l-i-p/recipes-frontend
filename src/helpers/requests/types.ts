
export interface User {
    name: string,
    id: number,
}

export interface FriendLists {
    friends: User[],
    incoming_requests: User[],
    outgoing_requests: User[],
}

export interface RecipeListItem {
    id: number,
    name: string,
    user: string,
    img_url: string,
}

export interface Ingredient {
    quantity: number,
    unit: string,
    name: string,
}

export interface Recipe {
    id: number,
    name: string,
    ingredients: Ingredient[],
    instructions: string[],
    user: string,
    likes: number,
    img_url: string,
}