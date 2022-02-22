
import { Button, Dialog, DialogActions, DialogContent, Divider, IconButton, List, ListItem, ListItemText, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { createFriendRequest, searchUsersRequest } from "../../helpers/requests/routes";
import React from "react";
import { User } from "../../helpers/requests/types";
import { useAppDispatch } from "../../app/hooks";
import { fetchFriends } from "./friendsSlice";
import { Callback } from "../../helpers/requests/requestHandler";

interface Props {
    show: boolean,
    close: () => void,
}

const UserSearchDialog = (props: Props) => {
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [users, setUsers] = useState<User[]>([])
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

    /**
     * Starts a new user search
     */
    const searchUsers = (searchTerm: string): void => {
        searchTerm.trim()
        if (!searchTerm) {
            return;
        }

        const callback: Callback = {
            onSuccess: (res) => {
                setUsers(res.data.result)
                setIsLoading(false)
            },
            onError: () => {
                setUsers([])
                setIsLoading(false)
            }
        }
        setIsLoading(true)
        searchUsersRequest(searchTerm, callback)
    }

    /**
     * Sends a friend request and closes the dialog.
     */
    const sendFriendRequest = (id: number): void => {
        createFriendRequest(id, {
            onSuccess: () => {
                setShowSnackbar(true)
                dispatch(fetchFriends())
            },
            onError: () => alert("Error sending friend request")
        })
        close()
    }

    /**
     * Closes the dialog.
     */
    const close = (): void => {
        props.close()
        setUsers([])
    }

    return (
        <React.Fragment>
            <Dialog open={props.show} onClose={() => close()} >
                <DialogContent sx={{ p: "8px" }}>
                    <TextField id="outlined-search" label="Sök användare" type="search" onChange={(e) => searchUsers(e.target.value)} />
                    <List>
                        {users.map((user, index) =>
                            <React.Fragment key={index}>
                                <ListItem secondaryAction={
                                    <IconButton onClick={() => sendFriendRequest(user.id)}>
                                        <GroupAddIcon />
                                    </IconButton>
                                }>
                                    <ListItemText primary={user.name} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => close()} autoFocus>
                        Stäng
                    </Button>
                </DialogActions>
            </Dialog>

            {/* TODO: Global snack handler */}
            <Snackbar open={showSnackbar} autoHideDuration={3000} message="Vänförfrågan skickad" onClose={(e, reason) => {
                if (reason === "clickaway") return;
                setShowSnackbar(false);
            }} />
        </React.Fragment>
    )
}

export default UserSearchDialog