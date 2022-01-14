import { Toolbar, Divider, List, ListItem, ListItemText, Box, CssBaseline, AppBar, IconButton, Typography, Drawer, ListItemIcon } from "@mui/material";
import { useState } from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { logoutRequest } from "../../interface/requests";
import { BasePage, popPage, setBasePage } from "./navigationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React from "react";

const DRAWER_WIDTH = 240;

function Navigation() {
    const pages = useAppSelector((state) => state.navigation.pages)
    const showNavigation = useAppSelector((state) => state.navigation.showNavigation)
    const dispatch = useAppDispatch()

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logoutRequest({
            onSuccess: () => dispatch(setBasePage(BasePage.Login)),
            onError: () => { alert("Error") },
        })
    }

    const onListClick = () => {
        setMobileOpen(false);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const currentPage = pages[pages.length - 1]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button onClick={() => { onListClick(); dispatch(setBasePage(BasePage.RecipeList)) }}>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Recept" />
                </ListItem>
                <ListItem button onClick={() => { onListClick(); dispatch(setBasePage(BasePage.CreateRecipe)) }}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Nytt Recept" />
                </ListItem>
                <ListItem disabled button>
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sparade Recept" />
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
                <ListItem button onClick={() => { onListClick(); handleLogout() }}>
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
            {showNavigation &&
                <React.Fragment>
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
                            {pages.length > 1 &&
                                <IconButton
                                    color="inherit"
                                    aria-label="back"
                                    edge="start"
                                    onClick={() => dispatch(popPage())}
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
                </React.Fragment>
            }
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)`, maxWidth: "100%" } }}
            >
                <Toolbar />
                {currentPage}
            </Box>
        </Box>
    );
}

export default Navigation