import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Ingredient from "../../../types/ingredient";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { encodeImageFileToBase64, isImage } from "../../../helpers/imageHelper";
import { uploadRecipeRequest } from "../../../interface/requests";
import EditIngredientList from "../../recipes/EditIngredientList";
import EditInstructionList from "../../recipes/EditInstructionList";

interface Props {
    onCreateRecipe: () => void,
}

const CreateRecipePage = (props: Props) => {
    const [name, setName] = useState<string>()
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [instructions, setInstructions] = useState<string[]>([])
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
        <Stack spacing={2}>
            <Paper elevation={2} id="main-form" component="form" onSubmit={onUploadRecipe}>
                <TextField
                    required
                    size="small"
                    label="Namn"
                    type="text"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
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
                {
                    image &&
                    <Paper elevation={2} style={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
                        <img src={image.url} style={{ width: "100%", aspectRatio: "1 / 1", maxHeight: "100vw" }} />
                    </Paper>
                }
                <label htmlFor="icon-button-file">
                    <input id="icon-button-file" accept="image/*" type="file" style={{ display: "none" }} onChange={(event) => onImageUpload(event)} />
                    <Button color="primary" aria-label="upload picture" component="span" variant="contained" endIcon={<PhotoCamera />}>
                        Välj bild
                    </Button>
                </label>
            </div>
            <Button type="submit" variant="contained" form="main-form">
                 Klar
            </Button>
        </Stack >
    )
}

export default CreateRecipePage;