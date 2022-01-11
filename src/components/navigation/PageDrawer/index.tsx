import { Toolbar, Divider, List, ListItem, ListItemText, Box, CssBaseline, AppBar, IconButton, Typography, Drawer, ListItemIcon } from "@mui/material";
import { useState } from "react";
import CreateRecipePage from "../../pages/CreateRecipePage";
import LoginPage from "../../pages/LoginPage";
import RecipeListPage from "../../pages/RecipeListPage";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutRequest } from "../../../interface/requests";

const DRAWER_WIDTH = 240;

function PageDrawer() {

    const onLogin = () => {
        setBasePage(<RecipeListPage openPage={pushHistoryPage} popPage={() => popHistoryPage()} />)
    }
    const logout = () => {
        logoutRequest({
            onSuccess: () => setBasePage(<LoginPage onLogin={onLogin} />),
            onError: () => { alert("Error") },
        })
    }
    const onCreateRecipe = () => {
        setBasePage(<RecipeListPage openPage={pushHistoryPage} popPage={() => popHistoryPage()}/>)
    }

    const [mobileOpen, setMobileOpen] = useState(false);
    const [history, setHistory] = useState<JSX.Element[]>([<LoginPage onLogin={onLogin} />]);

    const popHistoryPage = () => {
        if (history.length > 1) {
            const newHistory = [...history]
            newHistory.pop()
            setHistory([...newHistory])
        }
    }

    const pushHistoryPage = (page: JSX.Element) => {
        setHistory([...history, page])
    }

    const setBasePage = (page: JSX.Element) => {
        history.length = 0
        history.push(page)
        setHistory([...history])
        setMobileOpen(false);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const currentPage = history[history.length - 1]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button onClick={() => setBasePage(<RecipeListPage openPage={pushHistoryPage} popPage={popHistoryPage} />)}>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Recept" />
                </ListItem>
                <ListItem button onClick={() => setBasePage(<CreateRecipePage onCreateRecipe={onCreateRecipe} />)}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Nytt Recept" />
                </ListItem>
                <ListItem disabled button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vänner" />
                </ListItem>
                <ListItem disabled button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inställningar" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => logout()}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logga ut" />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {history.length > 1 &&
                        <IconButton
                            color="inherit"
                            aria-label="back"
                            edge="start"
                            onClick={popHistoryPage}
                            sx={{ mr: 2 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    }
                    <Typography variant="h6" noWrap component="div">
                        Recept App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={window.document.body}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
            >
                <Toolbar />
                {currentPage}
            </Box>
        </Box>
    );
}

export default PageDrawer