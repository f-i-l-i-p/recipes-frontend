import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import CreateRecipePage from "../../components/pages/CreateRecipePage";
import FriendsPage from "../../components/pages/FriendsPage";
import RecipeListPage from "../recipeList/RecipeList";
import { pushPage } from "./navigationSlice";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Friends } from "../friends/types";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";

const DRAWER_WIDTH = 240;

/**
 * Navigation drawer for desktop view.
 */
export default function NavDrawer() {
    const dispatch = useAppDispatch()
    const friends: Friends = useAppSelector((state) => state.friends.friends)

    const showFriendsNotification = friends.incomingRequests.length > 0

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
                    <ListItem button onClick={() => { dispatch(pushPage(<RecipeListPage />)) }}>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recept" />
                    </ListItem>
                    <ListItem button onClick={() => { dispatch(pushPage(<CreateRecipePage />)) }}>
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
                    <ListItem button onClick={() => { dispatch(pushPage(<FriendsPage />)) }}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vänner" />
                        {showFriendsNotification &&
                            <ListItemIcon>
                                <NotificationsActiveIcon color="error" />
                            </ListItemIcon>
                        }
                    </ListItem>
                    <ListItem disabled button>
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