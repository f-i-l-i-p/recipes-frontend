import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Stack from "@material-ui/core/Stack";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ConfirmDialog, { Props as DialogProps } from "../../components/ConfirmDialog";
import SectionHeading from "../../components/SectionHeading";
import { acceptFriendRequest, cancelFriendRequest, removeFriendRequest } from "../../helpers/requests/routes";
import { User } from "../../helpers/requests/types";
import { fetchFriends } from "./friendsSlice";
import { Friends } from "./types";

/**
 * Displays the current friends and active friend requests.
 */
const FriendsList = () => {
    const friends: Friends = useAppSelector((state) => state.friends.friends)
    const dispatch = useAppDispatch()

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [dialogProps, setDialogProps] = useState<DialogProps>({
        open: false,
        handleClose: () => { setDialogOpen(false) },
        title: "Ta bort",
        confirmText: "Ta bort",
        cancelText: "Avbryt",
        dangerous: true,
    })

    const reloadList = () => {
        dispatch(fetchFriends())
    }

    React.useEffect(() => {
        reloadList()
    }, []);

    const acceptFriend = (friend: User) => {
        acceptFriendRequest(friend.id, {
            onSuccess: () => reloadList(),
            onError: () => alert("Error"),
        })
    }

    const showDeclineFriendRequestDialog = (friend: User) => {
        setDialogProps({
            ...dialogProps,
            text: "Vill du ta bort vänförfrågan från " + friend.name + "?",
            onConfirm: () => cancelFriendRequest(friend.id, {
                onSuccess: () => reloadList(),
                onError: () => alert("Error"),
            }),
        })
        setDialogOpen(true)
    }

    const showCancelFriendRequestDialog = (friend: User) => {
        setDialogProps({
            ...dialogProps,
            text: "Vill du ta bort din vänförfrågan till " + friend.name + "?",
            onConfirm: () => cancelFriendRequest(friend.id, {
                onSuccess: () => reloadList(),
                onError: () => alert("Error"),
            }),
        })
        setDialogOpen(true)
    }

    const showRemoveFriendDialog = (friend: User) => {
        setDialogProps({
            ...dialogProps,
            text: "Vill du ta bort " + friend.name + " som vän?",
            onConfirm: () => removeFriendRequest(friend.id, {
                onSuccess: () => reloadList(),
                onError: () => alert("Error"),
            }),
        })
        setDialogOpen(true)
    }

    return (
        <Stack>
            {dialogProps &&
                <ConfirmDialog {...{ ...dialogProps, open: dialogOpen }} />
            }

            <UserList title="Förfrågningar" users={friends.incomingRequests} buttons={[
                { name: "Acceptera", onClick: user => acceptFriend(user) },
                { name: "Ta bort", onClick: user => showDeclineFriendRequestDialog(user) }
            ]} />

            <UserList title="Väntar på svar från" users={friends.outgoingRequests} buttons={[
                { name: "Ta bort", onClick: user => showCancelFriendRequestDialog(user) }
            ]} />

            <UserList title="Vänner" users={friends.currentFriends} buttons={[
                { name: "Ta bort", onClick: user => showRemoveFriendDialog(user) }
            ]} />
        </Stack>
    )
}

interface UserListProps {
    title: string,
    users: User[],
    buttons: {
        name: string,
        onClick: (user: User) => void
    }[],
}

/**
 * Displays a given list of users and a title.
 * Buttons that will be shown on each row can be specified in props.
 * Nothing is displayed if the list is empty.
 */
const UserList = (props: UserListProps) => {
    if (props.users.length === 0) {
        return (<React.Fragment />)
    }

    return (
        <React.Fragment>
            <SectionHeading txt={props.title} />
            <List component={Paper}>
                {props.users.map((user, index) =>
                    <ListItem
                        key={index}
                        secondaryAction={
                            props.buttons.map((button, index) =>
                                <Button key={index} color="info" variant="text" onClick={() => button.onClick(user)}>{button.name}</Button>
                            )
                        }>
                        <ListItemText>{user.name}</ListItemText>
                    </ListItem>
                )}
            </List>
            <Box sx={{ marginTop: "32px !important" }} />
        </React.Fragment>
    )
}

export default FriendsList