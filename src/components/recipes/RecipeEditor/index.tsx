import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Ingredient, { Recipe } from "../../../types/ingredient";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { formatImageToURL, isImage } from "../../../helpers/imageHelper";
import EditIngredientList from "../EditIngredientList";
import EditInstructionList from "../EditInstructionList";
import PhotoIcon from '@mui/icons-material/Photo';


interface Props {
    onComplete: (name: string, ingredients: Ingredient[], instructions: string[], image: string | undefined) => void,
    completeButtonText: string,
    startRecipe?: Recipe,
    showLoading?: boolean,
}

const RecipeEditor = (props: Props) => {
    const [recipeName, setRecipeName] = useState<string>(props.startRecipe?.name || "")
    const [recipeIngredients, setIngredients] = useState<Ingredient[]>(props.startRecipe?.ingredients || [])
    const [recipeInstructions, setInstructions] = useState<string[]>(props.startRecipe?.instructions || [])
    const [recipeImageURL, setImageURL] = useState<string>(props.startRecipe?.img_url || "")

    const onImageUpload = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        isImage(file, () => { // If file is an image
            formatImageToURL(file, (dataURL) => {
                setImageURL(dataURL)
            })
        })
    }

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const name = data.get('name')?.toString()

        if (!name || props.showLoading)
            return

        props.onComplete(recipeName, recipeIngredients, recipeInstructions, recipeImageURL)
    }

    return (
        <Stack spacing={4}>
            <Box sx={{ marginTop: "0px !important" }} />

            <Paper id="main-form" component="form" onSubmit={onFormSubmit} sx={{ p: "16px" }}>
                {/* Hidden button to prevent the form from submitting by pressing enter. */}
                <button type="submit" disabled style={{ display: "none" }}></button>

                <TextField
                    required
                    variant="standard"
                    size="small"
                    label="Namn"
                    type="text"
                    name="name"
                    defaultValue={recipeName}
                    onChange={(event) => setRecipeName(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        width: "100%"
                    }}
                />
            </Paper >
            <div>
                <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                    Ingredienser
                </Typography>
                <EditIngredientList ingredients={recipeIngredients} setIngredients={setIngredients} />
            </div>
            <div>
                <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                    Instruktioner
                </Typography>
                <EditInstructionList instructions={recipeInstructions} setInstructions={setInstructions} />
            </div>
            <div>
                <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                    Bild
                </Typography>
                <Paper sx={{ overflow: "hidden" }}>
                    <Stack direction="row">
                        <div style={{ width: "40%", aspectRatio: "1 / 1", maxHeight: "40vw", backgroundColor: "#0002", display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <img src={recipeImageURL || process.env.PUBLIC_URL + "/gray.png"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ width: "100%", alignSelf: "center" }}>
                            <label htmlFor="icon-button-file">
                                <input id="icon-button-file" accept="image/*" type="file" style={{ display: "none" }} onChange={(event) => onImageUpload(event)} />
                                <Button color="primary" aria-label="upload picture" component="span" variant="contained" endIcon={<PhotoCamera />} sx={{ m: "16px" }}>
                                    Välj bild
                                </Button>
                            </label>
                        </div>
                    </Stack>
                </Paper>
            </div>
            <Box sx={{ marginTop: "32px !important" }} />
            <Button disabled={props.showLoading} type="submit" variant="contained" form="main-form">
                {props.completeButtonText}
            </Button>
            <Box sx={{ marginTop: "100px !important" }} />
        </Stack >
    )
}

export default RecipeEditor;