import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { dataURLtoFile } from "../../../helpers/imageHelper";
import { recipeRequest } from "../../../interface/requests";
import { Recipe } from "../../../types/ingredient";
import IngredientList from "../../recipes/IngredientList";
import InstructionList from "../../recipes/InstructionList";
import EditIcon from '@mui/icons-material/Edit';
import EditRecipePage from "../EditRecipePage";
import { useAppDispatch } from "../../../app/hooks";
import { popPage, pushPage } from "../../../features/navigation/navigationSlice";

interface Props {
    id: number,
}

/**
 * Page that shows a recipe.
 * @param props Recipe id.
 */
const RecipePage = (props: Props) => {
    const dispatch = useAppDispatch()
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
        dispatch(popPage())
    }

    const editRecipe = () => {
        if (recipe) {
            dispatch(pushPage(<EditRecipePage onComplete={() => onEditDone()} recipe={recipe} />))
        }
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
                recipe &&
                <React.Fragment>
                    {imageURL &&
                        <div style={{ width: "calc(100% + 16px", margin: "-8px", marginBottom: 0, overflow: "hidden" }}>
                            <img src={imageURL} style={{ width: "100%", zIndex: -1, position: "relative", aspectRatio: "1 / 1", maxHeight: "100vw", objectFit: "cover" }} />
                            <div style={{ backgroundColor: "#fff8eb", height: "32px", marginTop: "-32px", borderRadius: "8px 8px 0 0", boxShadow: "0 -4px 40px 0 #000F" }} />
                        </div>
                    }
                    <Typography component="h1" variant="h5">
                        {recipe.name}
                    </Typography>
                    <IngredientList ingredients={recipe.ingredients} />
                    <InstructionList instructions={recipe.instructions} />
                    {/* TODO: Only show if recipe created by user */}
                    <Box sx={{ marginTop: "32px !important" }} />
                    <Button variant="text" startIcon={<EditIcon />} onClick={() => editRecipe()}>Redigera</Button>
                    <Box sx={{ marginTop: "32px !important" }} />
                </React.Fragment>
            }
        </Stack>
    )
}

export default RecipePage