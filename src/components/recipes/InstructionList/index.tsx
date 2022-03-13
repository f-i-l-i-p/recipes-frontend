import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import SectionHeading from "../../SectionHeading";

interface Props {
    instructions: string[]
}

/**
 * Shows a list of instructions
 */
const InstructionsList = (props: Props) => {
    return (
        <div>
            <SectionHeading txt="Instruktioner" />
            <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }}>
                    <TableBody>
                        {props.instructions.map((instruction, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right" sx={{ verticalAlign: "top", paddingRight: 0 }}>
                                    <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 800 }}>
                                        {(index + 1) + "."}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "99%" }}>
                                    <Typography variant="body2">{instruction}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    )
}

export default InstructionsList;