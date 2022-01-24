import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, Divider, Fab, IconButton, List, ListItem, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { latestRecipesRequest } from "../../../interface/requests";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import { Friends } from "../../../features/friends/types";

const AddFriends = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showSearch, setShowSearch] = useState<boolean>(true)
    const [friends, setFriends] = useState<Friends>({
        currentFriends: [], incomingRequests: [], outgoingRequests: []
    })

    const request = () => {
        latestRecipesRequest(null, {
            onSuccess: (json: any) => {
                setIsLoading(false)
            },
            onError: (json: any) => {
                setIsLoading(false)
            },
        })
    }

    React.useEffect(() => {
        request();
    }, []);

    const searchDialog = (
        <Dialog
            open={showSearch}
            onClose={() => setShowSearch(false)}
        >
            <DialogContent sx={{ p: "8px" }}>
                <TextField id="outlined-search" label="Search field" type="search" />
                <List>
                    <ListItem secondaryAction={
                        <IconButton>
                            <GroupAddIcon />
                        </IconButton>
                    }>
                        <ListItemText primary="Username" />
                    </ListItem>
                    <Divider />
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowSearch(false)} autoFocus>
                    Klar
                </Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <Stack>
            {searchDialog}
            <Fab color="primary" aria-label="add" onClick={() => setShowSearch(true)}>
                <GroupAddIcon />
            </Fab>
            {isLoading &&
                <CircularProgress />
            }
        </Stack>
    )
}

export default AddFriends