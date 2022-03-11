import { Box, Divider, IconButton, List, ListItem, Paper, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { Ingredient } from "../../../helpers/requests/types";

interface Props {
    setIngredients: (ingredients: Ingredient[]) => void,
    ingredients: Ingredient[],
}

/**
 * Shows a form for creating ingredients.
 */
const EditIngredientList = (props: Props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const unit = data.get("unit")?.toString()
        const quantity = Number(data.get("quantity")?.toString())
        const name = data.get("name")?.toString()

        if (unit === undefined || name === undefined) {
            return
        }

        event.currentTarget.reset()
        document.getElementById("ingredient-form-start")?.focus();

        props.setIngredients([
            ...props.ingredients,
            {
                name: name,
                quantity: quantity,
                unit: unit,
            }
        ])
    }

    const removeIngredient = (index: number) => {
        const newIngredients = [...props.ingredients]
        newIngredients.splice(index, 1)
        props.setIngredients(newIngredients)
    }

    return (
        <Box component={Paper} sx={{paddingBottom: "16px"}}>
            <List>
                {props.ingredients.map((ingredient, index) =>
                    <React.Fragment key={index}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => removeIngredient(index)}>
                                    <RemoveIcon />
                                </IconButton>
                            }
                            sx = {{whiteSpace: "nowrap"}}
                        >
                            <Typography variant="body2" align="left" sx={{ fontWeight: 800, marginRight: "8px" }}>{(ingredient.quantity || "") + " " + ingredient.unit}</Typography>
                            <Typography variant="body2" sx={{overflow: "hidden", textOverflow: "ellipsis"}}>{ingredient.name}</Typography>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                )}
            </List>
            <Stack component="form" onSubmit={handleSubmit} direction="row" sx={{ marginLeft: "16px" }}>
                <Stack direction="row" sx={{ width: "99%" }}>
                    <TextField
                        id="ingredient-form-start"
                        size="small"
                        variant="standard"
                        label="Mängd"
                        type="number"
                        name="quantity"
                        inputProps={{
                            step: "any"
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            width: "5em"
                        }}
                    />
                    <TextField
                        variant="standard"
                        size="small"
                        label="Enhet"
                        type="text"
                        name="unit"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            width: "5em"
                        }}
                    />
                    <TextField
                        required
                        variant="standard"
                        size="small"
                        label="Namn"
                        type="text"
                        name="name"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            width: "99%"
                        }}
                    />
                </Stack>
                <IconButton color="secondary" aria-label="add" size="small" type="submit" sx={{ width: "40px", height: "40px" }}>
                    <AddIcon />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default EditIngredientList;