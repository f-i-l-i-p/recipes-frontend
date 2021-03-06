import RecipeEditor from "../../recipes/RecipeEditor";
import { useState } from "react";
import { changeRecipeRequest } from "../../../helpers/requests/routes";
import { Recipe, Ingredient } from "../../../helpers/requests/types";

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
            onSuccess: () => {
                setIsLoading(false)
                props.onComplete()
            },
            onError: () => {
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