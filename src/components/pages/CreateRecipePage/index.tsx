import RecipeEditor from "../../recipes/RecipeEditor";
import { uploadRecipeRequest } from "../../../helpers/requests/routes";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { replacePage } from "../../../features/navigation/navigationSlice";
import { Ingredient } from "../../../helpers/requests/types";
import RecipeListPage from "../../../features/recipeList/RecipeList";

/**
 * Page for creating new recipes.
 */
function CreateRecipePage() {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onCreate = (name: string, ingredients: Ingredient[], instructions: string[], image: string | undefined) => {
        setIsLoading(true)

        const onSuccess = () => {
            dispatch(replacePage({ page: <RecipeListPage />, name: "Recipes" }))
            setIsLoading(false)
        }
        const onError = () => {
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