import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function DesktopAppBar() {
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
                    Recept App
                </Typography>
            </Toolbar>
            <Divider sx={{ backgroundColor: "#DDDDDD" }} />
        </AppBar>
    )
}