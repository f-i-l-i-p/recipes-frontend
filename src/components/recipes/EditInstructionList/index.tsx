import { Box, Divider, IconButton, List, ListItem, Paper, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

interface Props {
    setInstructions: (instructions: string[]) => void,
    instructions: string[],
}

/**
 * Shows a form for creating instructions.
 */
const EditInstructionList = (props: Props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const instruction = data.get("instruction")?.toString()

        if (instruction === undefined) {
            return
        }

        event.currentTarget.reset()
        document.getElementById("instruction-form-start")?.focus();

        props.setInstructions([
            ...props.instructions,
            instruction,
        ])
    }

    const removeInstruction = (index: number) => {
        const newInstructions = [...props.instructions]
        newInstructions.splice(index, 1)
        props.setInstructions(newInstructions)
    }

    return (
        <Box component={Paper} sx={{paddingBottom: "16px"}}>
            <List>
                {props.instructions.map((instruction, index) =>
                    <React.Fragment>
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => removeInstruction(index)}>
                                    <RemoveIcon />
                                </IconButton>
                            }
                        >
                            <Typography variant="subtitle1" sx={{alignSelf: "flex-start", marginRight:"8px"}}>{index + 1 + "."}</Typography>
                            <Typography>{instruction}</Typography>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                )}
            </List>
            <Stack component="form" onSubmit={handleSubmit} direction="row" sx={{ marginLeft: "16px" }}>
                <TextField
                    required
                    multiline
                    minRows={2}
                    id="instruction-form-start"
                    variant="standard"
                    size="small"
                    label="Instruktion"
                    type="text"
                    name="instruction"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        width: "99%"
                    }}
                />
                <IconButton color="primary" aria-label="add" size="small" type="submit" sx={{ alignSelf: "center", width: "40px", height: "40px" }}>
                    <AddIcon />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default EditInstructionList;