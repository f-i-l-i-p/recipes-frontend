import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, Divider, Fab, IconButton, List, ListItem, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { latestRecipesRequest } from "../../../interface/requests";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import FriendsList from "../../../features/friends/FriendList";
import UserSearchDialog from "../../../features/friends/UserSearch";

interface Friends {
    incomingRequests: any[],
    outgoingRequests: any[],
    currentFriends: any[],
}

const FriendsPage = () => {
    const [showSearch, setShowSearch] = useState<boolean>(true)
    const [friends, setFriends] = useState<Friends>({
        incomingRequests: [], outgoingRequests: [], currentFriends: []
    })

    return (
        <Stack>
            <UserSearchDialog show={showSearch} close={() => setShowSearch(false)} />
            <Fab color="primary" aria-label="add" onClick={() => setShowSearch(true)}>
                <GroupAddIcon />
            </Fab>
            <FriendsList />
        </Stack>
    )
}

export default FriendsPage