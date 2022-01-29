import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Stack from "@material-ui/core/Stack";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "../../types/ingredient";
import { fetchFriends } from "./friendsSlice";
import { Friends } from "./types";

/**
 * Displays the current friends and active friend requests.
 */
const FriendsList = () => {
    const friends: Friends = useAppSelector((state) => state.friends.friends)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchFriends())
    }, []);

    return (
        <Stack>
            <UserList title="Förfrågningar" users={friends.incomingRequests} />
            <UserList title="Väntar på svar" users={friends.outgoingRequests} />
            <UserList title="Vänner" users={friends.currentFriends} />
        </Stack>
    )
}

interface UserListProps {
    title: string,
    users: User[],
}

/**
 * Displays a given list of users and a title. Nothing is displayed if the list is empty.
 */
const UserList = (props: UserListProps) => {
    if (props.users.length === 0) {
        return (<React.Fragment />)
    }

    return (
        <React.Fragment>
            <Typography variant="h6" component="h2" align="left" sx={{ marginLeft: "8px" }}>
                {props.title}
            </Typography>
            <List component={Paper}>
                {props.users.map((user, index) =>
                    <ListItem key={index}>
                        <ListItemText>{user.name}</ListItemText>
                    </ListItem>
                )}
            </List>
            <Box sx={{ marginTop: "32px !important" }} />
        </React.Fragment>
    )
}

export default FriendsList