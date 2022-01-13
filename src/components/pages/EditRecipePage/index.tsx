import RecipeEditor from "../../recipes/RecipeEditor";
import Ingredient, { Recipe } from "../../../types/ingredient";
import { useState } from "react";

interface Props {
    onComplete: () => void,
    recipe: Recipe | undefined,
}

/**
 * Page for editing a recipe.
 */
function EditRecipePage(props: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSave = (name: string, ingredients: Ingredient[], instructions: string[], image: string | undefined) => {
        setIsLoading(true)
        
        const onSuccess = (json: any) => {
            props.onComplete()
            setIsLoading(false)
        }
        const onError = (json: any) => {
            alert("Error")
            setIsLoading(false)
        }

        props.onComplete() // TODO: remove
        //changeRecipeRequest(name, ingredients, instructions, image || null, { onSuccess: onSuccess, onError: onError })
    }

    return (
        <RecipeEditor onComplete={onSave} completeButtonText="Spara" showLoading={isLoading} startRecipe={props.recipe}/>
    )
}

export default EditRecipePage