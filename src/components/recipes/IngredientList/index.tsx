import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Ingredient from "../../../types/ingredient"

interface Props {
    ingredients: Ingredient[]
}

/**
 * Shows a list of ingredients
 */
const IngredientList = (props: Props) => {
    return (
        <div>
            <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                Ingredienser
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }}>
                    <TableBody>
                        {props.ingredients.map((ingredient, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{paddingRight: 0}} align="right">{ingredient.quantity}</TableCell>
                                <TableCell sx={{paddingLeft: "8px"}}>{ingredient.unit}</TableCell>
                                <TableCell sx={{ width: "99%" }}>{ingredient.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default IngredientList;