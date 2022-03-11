import { useState } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FriendsList from "../../../features/friends/FriendList";
import UserSearchDialog from "../../../features/friends/UserSearch";
import Stack from "@material-ui/core/Stack";
import Fab from "@material-ui/core/Fab";


const FriendsPage = () => {
    const [showSearch, setShowSearch] = useState<boolean>(false)

    return (
        <Stack sx={{m: 2}}>
            <UserSearchDialog show={showSearch} close={() => setShowSearch(false)} />
            <Fab color="primary" aria-label="add" onClick={() => setShowSearch(true)} sx={{alignSelf: "flex-end"}}>
                <GroupAddIcon />
            </Fab>
            <FriendsList />
        </Stack>
    )
}

export default FriendsPage