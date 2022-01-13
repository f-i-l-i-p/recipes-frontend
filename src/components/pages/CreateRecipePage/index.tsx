import RecipeEditor from "../../recipes/RecipeEditor";
import Ingredient from "../../../types/ingredient";
import { uploadRecipeRequest } from "../../../interface/requests";
import { useState } from "react";

interface Props {
    onComplete: () => void,
}

/**
 * Page for creating new recipes.
 */
function CreateRecipePage(props: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onCreate = (name: string, ingredients: Ingredient[], instructions: string[], image: string | undefined) => {
        setIsLoading(true)
        
        const onSuccess = (json: any) => {
            props.onComplete()
            setIsLoading(false)
        }
        const onError = (json: any) => {
            alert("Error")
            setIsLoading(false)
        }

        uploadRecipeRequest(name, ingredients, instructions, image || null, { onSuccess: onSuccess, onError: onError })
    }

    return (
        <RecipeEditor onComplete={onCreate} completeButtonText="Skapa" showLoading={isLoading} />
    )
}

export default CreateRecipePage