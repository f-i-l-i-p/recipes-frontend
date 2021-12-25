import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { recipeRequest } from "../../../interface/requests";
import { Recipe } from "../../../types/ingredient";

interface Props {
    id: number,
}

/**
 * Page that shows a recipe.
 * @param props Recipe id.
 */
const RecipePage = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [recipe, setRecipe] = useState<Recipe | null>(null)

    const request = () => {
        recipeRequest(props.id, {
            onSuccess: (json: any) => {
                setIsLoading(false)
                setRecipe(json)
            },
            onError: (json: any) => {
                setIsLoading(false)
            },
        })
    }

    React.useEffect(() => {
        request();
    }, []);

    return (
        <Stack>
            {isLoading &&
                <CircularProgress />
            }

            {recipe &&
                <Typography component="h1" variant="h5">
                    {recipe.name}
                </Typography>
            }
        </Stack>
    )
}

export default RecipePage