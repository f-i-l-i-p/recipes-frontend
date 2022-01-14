import RecipeEditor from "../../recipes/RecipeEditor";
import Ingredient, { Recipe } from "../../../types/ingredient";
import { useState } from "react";
import { changeRecipeRequest } from "../../../interface/requests";

interface Props {
    onComplete: () => void,
    recipe: Recipe,
}

/**
 * Page for editing a recipe.
 */
function EditRecipePage(props: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSave = (name: string, ingredients: Ingredient[], instructions: string[], image: string | undefined) => {
        setIsLoading(true)

        const listener = {
            onSuccess: (json: any) => {
                setIsLoading(false)
                props.onComplete()
            },
            onError: (json: any) => {
                alert("Error")
                setIsLoading(false)
            }
        }

        changeRecipeRequest(props.recipe.id, name, ingredients, instructions, image || null, listener)
    }

    return (
        <RecipeEditor onComplete={onSave} completeButtonText="Spara" showLoading={isLoading} startRecipe={props.recipe} />
    )
}

export default EditRecipePage