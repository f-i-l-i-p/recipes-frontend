import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { dataURLtoFile } from "../../../helpers/imageHelper";
import { recipeRequest } from "../../../interface/requests";
import Ingredient, { Recipe } from "../../../types/ingredient";
import IngredientList from "../../recipes/IngredientList";
import InstructionList from "../../recipes/InstructionList";
import EditIcon from '@mui/icons-material/Edit';
import RecipeEditor from "../../recipes/RecipeEditor";
import EditRecipePage from "../EditRecipePage";

interface Props {
    id: number,
    openPage: (page: JSX.Element) => void,
    popPage: () => void
}

/**
 * Page that shows a recipe.
 * @param props Recipe id.
 */
const RecipePage = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [recipe, setRecipe] = useState<Recipe>()

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

    const onEditDone = () => {
        props.popPage()
    }

    const editRecipe = () => {
        props.openPage(<EditRecipePage onComplete={() => onEditDone()} recipe={recipe} />)
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
            {isLoading ?
                <CircularProgress />
                :
                <React.Fragment>
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
                            {/* TODO: Only show if recipe created by user */}
                            <Button variant="text" startIcon={<EditIcon />} onClick={() => editRecipe()}>Redigera</Button>
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </Stack>
    )
}

export default RecipePage