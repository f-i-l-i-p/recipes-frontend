import Badge from "@material-ui/core/Badge";
import PeopleIcon from '@mui/icons-material/People';
import { useAppSelector } from "../../app/hooks";
import { Friends } from "./types";

export default function FriendsIcon() {
    const friends: Friends = useAppSelector((state) => state.friends.friends)

    const content = friends.incomingRequests.length

    return (
        <Badge color="error" variant="standard" overlap="circular" badgeContent={content}>
            <PeopleIcon />
        </Badge>
    )
}