import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { replacePage } from '../navigationSlice';
import { useAppDispatch } from '../../../app/hooks';
import RecipeListPage from '../../recipeList/RecipeList';
import FriendsPage from '../../../components/pages/FriendsPage';
import CreateRecipePage from '../../../components/pages/CreateRecipePage';
import FriendsIcon from '../../friends/FriendsIcon';

export default function NavBottom() {
    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState(0);

    const onSelect = (value: number, page: JSX.Element, name: string) => {
        setValue(value)
        dispatch(replacePage({ page: page, name: name }))
    }

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Divider sx={{ backgroundColor: "#DDDDDD" }} />
            <BottomNavigation
                showLabels
                value={value}
                sx={{ whiteSpace: "nowrap" }}
            >
                <BottomNavigationAction
                    onTouchStart={() => onSelect(0, <RecipeListPage />, "Recept")}
                    sx={{ mr: "-10px" }}
                    label="Recept"
                    icon={<MenuBookIcon />}
                />
                <BottomNavigationAction
                    onTouchStart={() => onSelect(1, <CreateRecipePage />, "Nytt Recept")}
                    sx={{ ml: "-10px", mr: "-10px" }}
                    label="Nytt Recept"
                    icon={<AddIcon />}
                />
                {/* <BottomNavigationAction
                    sx={{ ml: "-10px", mr: "-10px" }}
                    label="Gillade Recept"
                    icon={<FavoriteIcon />}
                /> */}
                <BottomNavigationAction
                    onTouchStart={() => onSelect(2, <FriendsPage />, "Vänner")}
                    sx={{ ml: "-10px", mr: "-10px" }}
                    label="Vänner"
                    icon={<FriendsIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

function refreshMessages() {
    throw new Error('Function not implemented.');
}
