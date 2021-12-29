import { Box, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    onCreateInstruction: (instruction: string) => void,
}

/**
 * Shows a form for creating recipe instruction.
 * onCreateInstruction is called on submit.
 */
const InstructionMaker = (props: Props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const instruction = data.get("instruction")?.toString()

        if (instruction === undefined) {
            return
        }

        props.onCreateInstruction(instruction)
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                multiline
                size="small"
                label="Instruction"
                type="text"
                name="instruction"
                InputLabelProps={{
                    shrink: true,
                }}
                sx = {{
                    width: "100%"
                }}
            />
            <Fab color="primary" aria-label="add" size="small" type="submit">
                <AddIcon />
            </Fab>
        </Box>
    )
}

export default InstructionMaker