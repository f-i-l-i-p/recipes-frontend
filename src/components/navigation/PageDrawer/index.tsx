import { Toolbar, Divider, List, ListItem, ListItemText, Box, CssBaseline, AppBar, IconButton, Typography, Drawer } from "@mui/material";
import { useState } from "react";
import CreateRecipePage from "../../pages/CreateRecipePage";
import LoginPage from "../../pages/LoginPage";
import RecipeListPage from "../../pages/RecipeListPage";
import MenuIcon from '@mui/icons-material/Menu';

const DRAWER_WIDTH = 240;

enum ActivePage {
    Login,
    RecipeList,
    CreateRecipe,
}

function PageDrawer() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activePage, setActivePage] = useState(ActivePage.Login);

    const onLogin = (token: String) => {
        setActivePage(ActivePage.RecipeList);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    let page
    switch (activePage) {
        case ActivePage.Login:
            page = <LoginPage onLogin={onLogin} />
            break
        case ActivePage.RecipeList:
            page = <RecipeListPage />
            break
        case ActivePage.CreateRecipe:
            page = <CreateRecipePage />
            break
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button onClick={() => setActivePage(ActivePage.RecipeList)}>
                    <ListItemText primary="Recipe List" />
                </ListItem>
                <ListItem button onClick={() => setActivePage(ActivePage.CreateRecipe)}>
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
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
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
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
            >
                <Toolbar />
                {page}
            </Box>
        </Box>
    );
}

export default PageDrawer