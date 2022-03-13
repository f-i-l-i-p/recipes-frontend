import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useAppSelector } from "../../../app/hooks";

export default function DesktopAppBar() {
    const pages = useAppSelector((state) => state.navigation.pages)
    const currentPageIndex = useAppSelector((state) => state.navigation.currentPageIndex)

    const currentPageName = pages[currentPageIndex].name

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#ffffff",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {currentPageName}
                </Typography>
            </Toolbar>
            <Divider sx={{ backgroundColor: "#DDDDDD" }} />
        </AppBar>
    )
}