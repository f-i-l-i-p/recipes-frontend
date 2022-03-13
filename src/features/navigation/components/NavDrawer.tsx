import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import CreateRecipePage from "../../../components/pages/CreateRecipePage";
import FriendsPage from "../../../components/pages/FriendsPage";
import RecipeListPage from "../../recipeList/RecipeList";
import { pushPage } from "../navigationSlice";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Friends } from "../../friends/types";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import SettingsPage from "../../../components/pages/SettingsPage";
import FriendsIcon from "../../friends/FriendsIcon";

const DRAWER_WIDTH = 240;

/**
 * Navigation drawer for desktop view.
 */
export default function NavDrawer() {
    const dispatch = useAppDispatch()

    return (
        <Box sx={{ width: `${DRAWER_WIDTH}px` }}>
            <Drawer
                variant="permanent"
                open
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem button onClick={() => { dispatch(pushPage({page: <RecipeListPage />, name: "Recept" })) }}>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recept" />
                    </ListItem>
                    <ListItem button onClick={() => { dispatch(pushPage({page: <CreateRecipePage />, name: "Nytt Recept" })) }}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nytt Recept" />
                    </ListItem>
                    <ListItem disabled button>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gillade Recept" />
                    </ListItem>
                    <ListItem button onClick={() => { dispatch(pushPage({page: <FriendsPage />, name: "Vänner" })) }}>
                        <ListItemIcon>
                            <FriendsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vänner" />
                    </ListItem>
                    <ListItem button onClick={() => { dispatch(pushPage({page: <SettingsPage />, name: "Inställningar" }))}}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inställningar" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
}