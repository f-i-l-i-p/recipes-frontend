import { Autocomplete, Box, Fab, Stack, TextField } from "@mui/material";
import Ingredient from "../../types/ingredient";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    onCreateIngredient: (ingredient: Ingredient) => void,
}

/**
 * Shows a form for creating ingredients.
 * onCreateIngredient is called on submit.
 */
const IngredientMaker = (props: Props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const unit = data.get("unit")?.toString()
        const quantity = Number(data.get("quantity")?.toString())
        const name = data.get("name")?.toString()

        if (unit === undefined || name === undefined) {
            return
        }

        props.onCreateIngredient({
            name: name,
            unit: unit,
            quantity: quantity,
        })
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack direction="row">
                <TextField
                    size="small"
                    label="Quantity"
                    type="number"
                    name="quantity"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Autocomplete
                    size="small"
                    disablePortal
                    options={units}
                    renderInput={(params: any) => <TextField
                        {...params}
                        label="Unit"
                        name="unit"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />}
                />
                <TextField
                    required
                    size="small"
                    label="Name"
                    type="text"
                    name="name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Stack>
            <Fab color="primary" aria-label="add" size="small" type="submit">
                <AddIcon />
            </Fab>
        </Box>
    )
}

const units: string[] = [
    "g",
    "kg",
    "ml",
    "cl",
    "dl",
    "l"
]

export default IngredientMaker;