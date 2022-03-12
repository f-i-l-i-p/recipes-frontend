import { AppBar, Toolbar, IconButton, Typography, Divider } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPage from "../../components/pages/SettingsPage";
import { pushPage } from "./navigationSlice";

export default function MobileAppBar() {
    const dispatch = useAppDispatch()
    const currentPageIndex = useAppSelector((state) => state.navigation.currentPageIndex)
    const showBackButton = currentPageIndex !== 0

    const onBackButtonClick = () => {
        window.history.back()
    }

    const onSettingsButtonClick = () => {
        dispatch(pushPage(<SettingsPage />))
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#ffffff",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <IconButton
                    color="secondary"
                    onClick={() => onBackButtonClick()}
                    disabled={!showBackButton}
                    sx={{ visibility: showBackButton ? "visible" : "hidden" }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ width: "100%" }}>
                    Recept App
                </Typography>

                <IconButton
                    color="secondary"
                    onClick={() => onSettingsButtonClick()}
                >
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
            <Divider sx={{ backgroundColor: "#DDDDDD" }} />
        </AppBar>
    )
}