import { Divider, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import Ingredient from "../../../types/ingredient";
import IngredientMaker from "../../IngredientMaker";
import InstructionMaker from "../../InstructionMaker";

const CreateRecipePage = () => {
    const initialIngredients: Ingredient[] = []
    const initialInstructions: string[] = []
    const [ingredients, setIngredients] = useState(initialIngredients)
    const [instructions, setInstructions] = useState(initialInstructions)

    const addIngredient = (ingredient: Ingredient) => {
        setIngredients([...ingredients, ingredient])
    }

    const addInstruction = (instruction: string) => {
        setInstructions([...instructions, instruction])
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
        </Stack>
    )
}

export default CreateRecipePage;