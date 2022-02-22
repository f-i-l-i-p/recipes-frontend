import { Box, CircularProgress, ListItem, ListItemButton, ListItemText, Paper, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { pushPage } from "../../../features/navigation/navigationSlice";
import { latestRecipesRequest } from "../../../helpers/requests/routes";
import { RecipeListItem } from "../../../types/ingredient";
import RecipePage from "../RecipePage";
import RecipeListItemComponent from "./RecipeListItemComponent";

const RecipeListPage = () => {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [recipes, setRecipes] = useState<RecipeListItem[]>([])

    const request = () => {
        latestRecipesRequest(null, {
            onSuccess: (res) => {
                setIsLoading(false)
                setRecipes(res.data.result)
            },
            onError: () => {
                setIsLoading(false)
            },
        })
    }

    const openRecipe = (recipeListItem: RecipeListItem) => {
        dispatch(pushPage(<RecipePage recipe={recipeListItem} />))
    }

    React.useEffect(() => {
        request();
    }, []);

    return (
        <Stack>
            {isLoading &&
                <CircularProgress sx={{marginLeft: "auto", marginRight: "auto"}} />
            }
            <Box sx={{ marginTop: "16px !important" }} />
            {recipes.map((recipe, index) =>
                <React.Fragment key={index}>
                    <RecipeListItemComponent item={recipe} onClick={() => openRecipe(recipe)} />
                    <Box sx={{ marginTop: "16px !important" }} />
                </React.Fragment>
            )}
            <Box sx={{ marginTop: "32px !important" }} />
        </Stack>
    )
}

export default RecipeListPage