import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { deleteRecipeRequest, recipeRequest } from "../../../helpers/requests/routes";
import { Recipe, RecipeListItem } from "../../../helpers/requests/types";
import IngredientList from "../../recipes/IngredientList";
import InstructionList from "../../recipes/InstructionList";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRecipePage from "../EditRecipePage";
import { useAppDispatch } from "../../../app/hooks";
import { DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { pushPage } from "../../../features/navigation/navigationSlice";

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

    // Use data from newly loaded recipe in possible, otherwise use data from props.
    const image_url = recipe?.img_url || props.recipe.img_url
    const name = recipe?.name || props.recipe.name

    const request = () => {
        recipeRequest(props.recipe.id, {
            onSuccess: (res) => { setRecipe(res.data) },
        })
    }

    const editRecipe = () => {
        if (recipe) {
            dispatch(pushPage({
                page: <EditRecipePage onComplete={() => onEditSave()} recipe={recipe} />,
                name: "Redigera"
            }))
        }
    }

    const onEditSave = () => {
        window.history.back()
    }

    const deleteRecipe = () => {
        setDeleteLoading(true)
        deleteRecipeRequest(props.recipe.id, {
            onSuccess: () => {
                window.history.back();
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

            {image_url ?
                <div style={{ width: "100%", marginBottom: 0, overflow: "hidden" }}>
                    <img src={image_url} style={{ width: "100%", zIndex: -1, position: "relative", aspectRatio: "1 / 1", maxHeight: "100vw", objectFit: "cover" }} />
                    <div style={{ backgroundColor: "#F2F2F7", height: "32px", marginTop: "-32px", borderRadius: "8px 8px 0 0", boxShadow: "0 -4px 40px 0 #000F" }} />
                </div>
                :
                <Box sx={{ marginTop: "64px !important" }} />
            }

            <Box sx={{ pl: 2, pr: 2 }}>

                <Typography component="h2" variant="h5" sx={{ m: "-10px 0 20px 0 !important" }}>
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
                            <Button variant="text" color="secondary" startIcon={<EditIcon />} onClick={() => editRecipe()}>Redigera</Button>
                            <Button disabled={deleteLoading} variant="text" color="error" startIcon={<DeleteIcon />} onClick={() => setShowDeleteDialog(true)}>Radera</Button>
                        </Stack>
                    </React.Fragment>
                }

            </Box>

            <Box sx={{ marginTop: "32px !important" }} />
        </Stack>
    )
}

export default RecipePage