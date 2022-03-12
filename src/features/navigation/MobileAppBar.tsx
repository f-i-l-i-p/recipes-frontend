import { AppBar, Toolbar, IconButton, Typography, Divider } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

export default function MobileAppBar() {
    const currentPageIndex = useAppSelector((state) => state.navigation.currentPageIndex)
    const showBackButton = currentPageIndex !== 0

    const onBackButtonClick = () => {
        window.history.back()
    }

    const onSettingsButtonClick = () => {

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
                    sx={{visibility: showBackButton ? "visible" : "hidden"}}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ width: "100%" }}>
                    Recept App
                </Typography>

                <IconButton
                    color="secondary"
                    onClick={() => onSettingsButtonClick()}
                    disabled
                >
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
            <Divider sx={{ backgroundColor: "#DDDDDD" }} />
        </AppBar>
    )
}