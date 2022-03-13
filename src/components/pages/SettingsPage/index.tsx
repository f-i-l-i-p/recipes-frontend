import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";
import Typography from "@material-ui/core/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "../../../app/hooks";
import { pushPage, setShowNavigation } from "../../../features/navigation/navigationSlice";
import { logoutRequest } from "../../../helpers/requests/routes";
import Spacing from "../../Spacing";
import LoginPage from "../LoginPage";

export default function SettingsPage() {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        logoutRequest({
            onSuccess: () => {
                dispatch(pushPage({ page: <LoginPage />, name: "" }))
                dispatch(setShowNavigation(false))
            },
            onError: () => { alert("Error") },
        })
    }

    return (
        <Stack spacing={2} sx={{ m: 2, display: "block" }}>
            <Spacing spacing={4} />
            <Button
                variant="contained"
                onClick={() => handleLogout()}
                endIcon={<LogoutIcon />}
            >
                Logga ut
            </Button>

            <Typography>
                Ja, det va alla inställningar.
            </Typography>
        </Stack>
    )
}