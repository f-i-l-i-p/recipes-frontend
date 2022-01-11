import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Ingredient, { Recipe } from "../../../types/ingredient";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { encodeImageFileToBase64, isImage } from "../../../helpers/imageHelper";
import { uploadRecipeRequest } from "../../../interface/requests";
import EditIngredientList from "../../recipes/EditIngredientList";
import EditInstructionList from "../../recipes/EditInstructionList";
import PhotoIcon from '@mui/icons-material/Photo';

interface Props {
    onCreateRecipe: () => void,
    recipe?: Recipe,
}

const CreateRecipePage = (props: Props) => {
    const [recipeName, setRecipeName] = useState<string>(props.recipe?.name || "")
    const [ingredients, setIngredients] = useState<Ingredient[]>(props.recipe?.ingredients || [])
    const [instructions, setInstructions] = useState<string[]>(props.recipe?.instructions || [])
    const [image, setImage] = useState<{ file: File, url: string }>()

    const onImageUpload = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        isImage(file, () => {
            // If file is an image
            setImage({
                file: file,
                url: URL.createObjectURL(file),
            })
        })
    }

    const onUploadRecipe = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const name = data.get('name')?.toString()

        if (!name)
            return

        const onSuccess = (json: any) => {
            props.onCreateRecipe()
        }
        const onError = (json: any) => {
            alert("error")
        }

        const upload = (imageBase64: null | string) => {
            uploadRecipeRequest(name, ingredients, instructions, imageBase64, { onSuccess: onSuccess, onError: onError })
        }

        if (image) {
            encodeImageFileToBase64(image?.file, (callback) => {
                upload(callback);
            })
        } else {
            upload(null)
        }
    }

    return (
        <Stack spacing={4}>
            <Box sx={{marginTop: "0px !important"}} />

            <Paper id="main-form" component="form" onSubmit={onUploadRecipe} sx={{ p: "16px" }}>
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
                <EditIngredientList ingredients={ingredients} setIngredients={setIngredients} />
            </div>
            <div>
                <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                    Instruktioner
                </Typography>
                <EditInstructionList instructions={instructions} setInstructions={setInstructions} />
            </div>
            <div>
                <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                    Bild
                </Typography>
                <Paper sx={{ overflow: "hidden" }}>
                    <Stack direction="row">
                        <div style={{ width: "40%", aspectRatio: "1 / 1", maxHeight: "40vw", backgroundColor: "#0002", display: "flex", alignItems: "center", justifyContent: "center" }} >
                            {image ?
                                <img src={image.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                :
                                <PhotoIcon sx={{ minHeight: "20%", minWidth: "20%" }} />
                            }
                        </div>
                        <div style={{ width: "100%", alignSelf: "center" }}>
                            <label htmlFor="icon-button-file">
                                <input id="icon-button-file" accept="image/*" type="file" style={{ display: "none" }} onChange={(event) => onImageUpload(event)} />
                                <Button color="primary" aria-label="upload picture" component="span" variant="contained" endIcon={<PhotoCamera />} sx={{m: "16px"}}>
                                    Välj bild
                                </Button>
                            </label>
                        </div>
                    </Stack>
                </Paper>
            </div>
            <Box sx={{marginTop: "32px !important"}} />
            <Button type="submit" variant="contained" form="main-form">
                Klar
            </Button>
            <Box sx={{marginTop: "100px !important"}} />
        </Stack >
    )
}

export default CreateRecipePage;