import { Toolbar, Divider, List, ListItem, ListItemText, Box, CssBaseline, AppBar, IconButton, Typography, Drawer } from "@mui/material";
import { useState } from "react";
import CreateRecipePage from "../../pages/CreateRecipePage";
import LoginPage from "../../pages/LoginPage";
import RecipeListPage from "../../pages/RecipeListPage";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DRAWER_WIDTH = 240;

function PageDrawer() {

    const onLogin = (token: String) => {
        setBasePage(<RecipeListPage openPage={pushHistoryPage} />)
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
                <ListItem button onClick={() => setBasePage(<RecipeListPage openPage={pushHistoryPage} />)}>
                    <ListItemText primary="Recipe List" />
                </ListItem>
                <ListItem button onClick={() => setBasePage(<CreateRecipePage />)}>
                    <ListItemText primary="Create Recipe" />
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
                        Recipes
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