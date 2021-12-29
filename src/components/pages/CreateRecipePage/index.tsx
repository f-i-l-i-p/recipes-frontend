import { Button, Divider, Input, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Ingredient from "../../../types/ingredient";
import IngredientMaker from "../../recipes/IngredientMaker";
import InstructionMaker from "../../recipes/InstructionMaker";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { encodeImageFileToBase64, isImage } from "../../../helpers/imageHelper";
import { uploadRecipeRequest } from "../../../interface/requests";

const CreateRecipePage = () => {
    const [name, setName] = useState<string>()
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [instructions, setInstructions] = useState<string[]>([])
    const [image, setImage] = useState<{ file: File, url: string }>()

    const addIngredient = (ingredient: Ingredient) => {
        setIngredients([...ingredients, ingredient])
    }

    const addInstruction = (instruction: string) => {
        setInstructions([...instructions, instruction])
    }

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
            alert("success")
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
                    label="Name"
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
                    Ingredients
                </Typography>
                <Paper elevation={2}>
                    <Stack spacing={2}>
                        <Table sx={{ width: "100%" }}>
                            <TableBody>
                                {ingredients.map((ingredient, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{ingredient.quantity}</TableCell>
                                        <TableCell>{ingredient.unit}</TableCell>
                                        <TableCell>{ingredient.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <IngredientMaker onCreateIngredient={(ingredient: Ingredient) => addIngredient(ingredient)} />
                    </Stack>
                </Paper>
            </div>
            <div>
                <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                    Instructions
                </Typography>
                <Paper elevation={2}>
                    <Stack spacing={2}>
                        <List sx={{ width: "100%" }}>
                            {instructions.map((instruction, index) => (
                                <ListItem key={index}>
                                    <Stack style={{ width: "100%" }}>
                                        <Typography component="h3" variant="h6">{index + 1}</Typography>
                                        <Typography style={{ whiteSpace: "pre" }}>{instruction}</Typography>
                                        <Divider style={{ width: "100%" }} />
                                    </Stack>
                                </ListItem>
                            ))}
                        </List>
                        <InstructionMaker onCreateInstruction={(instruction: string) => addInstruction(instruction)} />
                    </Stack>
                </Paper>
            </div>
            <div>
                <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                    Image
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
                        Upload Photo
                    </Button>
                </label>
            </div>
            <Button type="submit" variant="contained" form="main-form">
                Create Recipe
            </Button>
        </Stack >
    )
}

export default CreateRecipePage;