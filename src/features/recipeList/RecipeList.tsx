import { Box, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pushPage } from "../navigation/navigationSlice";
import { fetchRecipes, fetchRecipesBackground } from "./recipeListSlice";
import { RecipeListItem } from "../../helpers/requests/types";
import RecipePage from "../../components/pages/RecipePage";
import RecipeListItemComponent from "./RecipeListItemComponent";

const RecipeListPage = () => {
    const dispatch = useAppDispatch()
    const isLoading: boolean = useAppSelector((state) => state.recipeList.isLoading)
    const recipes: RecipeListItem[] = useAppSelector((state) => state.recipeList.recipes)

    const openRecipe = (recipeListItem: RecipeListItem) => {
        dispatch(pushPage({ page: <RecipePage recipe={recipeListItem} />, name: recipeListItem.name }))
    }

    React.useEffect(() => {
        if (recipes.length === 0) {
            dispatch(fetchRecipes())
        } else {
            dispatch(fetchRecipesBackground())
        }
    }, []);

    return (
        <Stack>
            {isLoading &&
                <CircularProgress sx={{ marginLeft: "auto", marginRight: "auto" }} />
            }
            <Box sx={{ marginTop: "16px !important" }} />
            {recipes.map((recipe, index) =>
                <React.Fragment key={index}>
                    <RecipeListItemComponent item={recipe} onClick={() => openRecipe(recipe)} />
                </React.Fragment>
            )}
            <Box sx={{ marginTop: "32px !important" }} />
        </Stack>
    )
}

export default RecipeListPage