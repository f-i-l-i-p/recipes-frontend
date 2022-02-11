
export default interface Ingredient {
    quantity: number,
    unit: string,
    name: string,
}

export interface RecipeListItem {
    id: number,
    name: string,
    user: string,
    img_url: string,
}

export interface Recipe {
    id: number,
    name: string,
    ingredients: Ingredient[],
    instructions: string[],
    user: string,
    comments: any[],
    likes: number,
    img_url: string,
}

export interface User {
    name: string,
    id: number,
}
