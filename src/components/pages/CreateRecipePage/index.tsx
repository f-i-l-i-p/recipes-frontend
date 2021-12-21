import { Button, Divider, Input, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import Ingredient from "../../../types/ingredient";
import IngredientMaker from "../../IngredientMaker";
import InstructionMaker from "../../InstructionMaker";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { isImage } from "../../../helpers/imageHelper";

const CreateRecipePage = () => {
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

    return (
        <Stack spacing={2}>
            <Paper elevation={2}>
                <Stack spacing={2}>
                    <Typography component="h2" variant="h5">
                        Ingredients
                    </Typography>
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
            <Paper elevation={2}>
                <Stack spacing={2}>
                    <Typography component="h2" variant="h5">
                        Instructions
                    </Typography>
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
            {image &&
            <Paper elevation={2} style={{overflow: "hidden", aspectRatio:"1 / 1"}}>
                <img src={image.url} style={{width: "100%", aspectRatio:"1 / 1"}}/>
            </Paper>
            }
            <label htmlFor="icon-button-file">
                <input id="icon-button-file" accept="image/*" type="file" style={{ display: "none" }} onChange={(event) => onImageUpload(event)} />
                <Button color="primary" aria-label="upload picture" component="span" variant="contained" endIcon={<PhotoCamera />}>
                    Upload Photo
                </Button>
            </label>
        </Stack>
    )
}

export default CreateRecipePage;