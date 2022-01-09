import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

interface Props {
    instructions: string[]
}

/**
 * Shows a list of instructions
 */
const InstructionsList = (props: Props) => {
    return (
        <div>
            <Typography variant="h6" component="h2" align="left" sx={{marginLeft: "8px"}}>
                Instruktioner
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }}>
                    <TableBody>
                        {props.instructions.map((instruction, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right" sx={{ verticalAlign: "top", paddingRight: 0 }}>
                                    <Typography variant="subtitle1" component="h3">
                                        {index + "."}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "99%" }}>{instruction}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    )
}

export default InstructionsList;