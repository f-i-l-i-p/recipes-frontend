import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Ingredient } from "../../../helpers/requests/types";
import SectionHeading from "../../SectionHeading";

interface Props {
    ingredients: Ingredient[]
}

/**
 * Shows a list of ingredients
 */
const IngredientList = (props: Props) => {
    return (
        <div>
            <SectionHeading txt="Ingredienser" />
            <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }}>
                    <TableBody>
                        {props.ingredients.map((ingredient, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ paddingRight: 0 }} align="right">
                                    <Typography variant="body2" sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>{(ingredient.quantity || "") + " " + ingredient.unit}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: "99%" }}>
                                    <Typography variant="body2">{ingredient.name}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default IngredientList;