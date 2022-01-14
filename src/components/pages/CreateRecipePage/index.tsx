import RecipeEditor from "../../recipes/RecipeEditor";
import Ingredient from "../../../types/ingredient";
import { uploadRecipeRequest } from "../../../interface/requests";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { BasePage, setBasePage } from "../../../features/navigation/navigationSlice";

/**
 * Page for creating new recipes.
 */
function CreateRecipePage() {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onCreate = (name: string, ingredients: Ingredient[], instructions: string[], image: string | undefined) => {
        setIsLoading(true)
        
        const onSuccess = (json: any) => {
            dispatch(setBasePage(BasePage.RecipeList))
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