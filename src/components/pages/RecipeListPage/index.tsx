import { CircularProgress, Divider, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { latestRecipesRequest } from "../../../interface/requests";
import { RecipeListItem } from "../../../types/ingredient";
import RecipePage from "../RecipePage";

interface Props {
    openPage: (page: JSX.Element) => void,
}

const RecipeListPage = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [recipes, setRecipes] = useState<RecipeListItem[]>([])

    const request = () => {
        latestRecipesRequest(null, {
            onSuccess: (json: any) => {
                setIsLoading(false)
                setRecipes(json.result)
            },
            onError: (json: any) => {
                setIsLoading(false)
            },
        })
    }

    const openPage = (recipeListItem: RecipeListItem) => {
        props.openPage(<RecipePage id={recipeListItem.id} />)
    }

    React.useEffect(() => {
        request();
    }, []);

    return (
        <Stack>
            {isLoading &&
                <CircularProgress />
            }
            {recipes.map((recipe, index) =>
                <React.Fragment key={index}>
                    <ListItem>
                        <ListItemButton onClick={() => openPage(recipe)}>
                            <ListItemText primary={recipe.name} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </React.Fragment>
            )}
        </Stack>
    )
}

export default RecipeListPage