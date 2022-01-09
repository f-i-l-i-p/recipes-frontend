import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { dataURLtoFile } from "../../../helpers/imageHelper";
import { recipeRequest } from "../../../interface/requests";
import { Recipe } from "../../../types/ingredient";
import IngredientList from "../../recipes/IngredientList";
import InstructionList from "../../recipes/InstructionList";

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

    let imageURL: string | null = null
    if (recipe && recipe.image) {
        imageURL = URL.createObjectURL(dataURLtoFile(recipe.image))
    }

    return (
        <Stack spacing={2}>
            {isLoading &&
                <CircularProgress />
            }

            {recipe &&
                <React.Fragment>
                    {imageURL &&
                        <img src={imageURL} style={{ width: "100%", aspectRatio: "1 / 1", maxHeight: "100vw" }} />
                    }
                    <Typography component="h1" variant="h5">
                        {recipe.name}
                    </Typography>
                    <IngredientList ingredients={recipe.ingredients} />
                    <InstructionList instructions={recipe.instructions} />
                </React.Fragment>
            }
        </Stack>
    )
}

export default RecipePage