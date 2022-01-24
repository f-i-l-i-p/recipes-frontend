import { Stack } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { fetchFriends, sendFriendRequest } from "./friendsSlice";

const FriendsList = () => {
    const dispatch = useAppDispatch()

    dispatch(fetchFriends())

    return (
        <Stack>
        </Stack>
    )
}

export default FriendsList