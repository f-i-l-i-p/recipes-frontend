import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { deleteRecipeRequest, recipeRequest } from "../../../interface/requests";
import { Recipe, RecipeListItem } from "../../../types/ingredient";
import IngredientList from "../../recipes/IngredientList";
import InstructionList from "../../recipes/InstructionList";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRecipePage from "../EditRecipePage";
import { useAppDispatch } from "../../../app/hooks";
import { popPage, pushPage } from "../../../features/navigation/navigationSlice";
import { DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

interface Props {
    recipe: RecipeListItem,
}

/**
 * Page that shows a recipe.
 * @param props Recipe id.
 */
const RecipePage = (props: Props) => {
    const dispatch = useAppDispatch()
    const [recipe, setRecipe] = useState<Recipe>()
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    const request = () => {
        recipeRequest(props.recipe.id, {
            onSuccess: (json: any) => {
                setRecipe(json)
            },
            onError: () => { },
        })
    }

    const editRecipe = () => {
        if (recipe) {
            dispatch(pushPage(<EditRecipePage onComplete={() => dispatch(popPage())} recipe={recipe} />))
        }
    }

    const deleteRecipe = () => {
        setDeleteLoading(true)
        deleteRecipeRequest(props.recipe.id, {
            onSuccess: () => {
                dispatch(popPage())
            },
            onError: () => {
                alert("Delete recipe error")
                setDeleteLoading(false)
            }
        })
    }

    React.useEffect(() => {
        request();
    }, []);

    // Use data from newly loaded recipe in possible, otherwise use data from props.
    const image_url = recipe?.img_url || props.recipe.img_url
    const name = recipe?.name || props.recipe.name

    const deleteDialog = (
        <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
            <DialogTitle>
                Radera
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vill du radera "{recipe?.name}"?
                </DialogContentText>
                <DialogContentText>
                    Det kommer även att försvinna för andra användre.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowDeleteDialog(false)}>Avbryt</Button>
                <Button autoFocus color="error" onClick={deleteRecipe}>Radera</Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <Stack spacing={2}>
            {deleteDialog}
            <React.Fragment>
                {image_url ?
                    <div style={{ width: "calc(100% + 16px", margin: "-8px", marginBottom: 0, overflow: "hidden" }}>
                        <img src={image_url} style={{ width: "100%", zIndex: -1, position: "relative", aspectRatio: "1 / 1", maxHeight: "100vw", objectFit: "cover" }} />
                        <div style={{ backgroundColor: "#fff8eb", height: "32px", marginTop: "-32px", borderRadius: "8px 8px 0 0", boxShadow: "0 -4px 40px 0 #000F" }} />
                    </div>
                    :
                    <Box sx={{ marginTop: "64px !important" }} />
                }
                <Typography component="h1" variant="h5" sx={{ m: "-10px 0 10px 0 !important" }}>
                    {name}
                </Typography>
                {recipe &&
                    <React.Fragment>
                        {recipe.ingredients.length > 0 &&
                            <React.Fragment>
                                <IngredientList ingredients={recipe.ingredients} />
                                <Box sx={{ marginTop: "32px !important" }} />
                            </React.Fragment>
                        }
                        {recipe.instructions.length > 0 &&
                            <React.Fragment>
                                <InstructionList instructions={recipe.instructions} />
                                <Box sx={{ marginTop: "32px !important" }} />
                            </React.Fragment>
                        }
                        {/* TODO: Only show if recipe created by user */}
                        <Stack direction="row" justifyContent="space-between">
                            <Button variant="text" startIcon={<EditIcon />} onClick={() => editRecipe()}>Redigera</Button>
                            <Button disabled={deleteLoading} variant="text" color="error" startIcon={<DeleteIcon />} onClick={() => setShowDeleteDialog(true)}>Radera</Button>
                        </Stack>
                    </React.Fragment>
                }
                <Box sx={{ marginTop: "32px !important" }} />
            </React.Fragment>
        </Stack>
    )
}

export default RecipePage