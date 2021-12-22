import { CircularProgress, Divider, ListItem, ListItemText, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { latestRecipes } from "../../../interface/requests";
import { RecipeListItem } from "../../../types/ingredient";

const RecipeListPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [recipes, setRecipes] = useState<RecipeListItem[]>([])

    const request = () => {
        latestRecipes(null, {
            onSuccess: (json: any) => {
                setIsLoading(false)
                setRecipes(json.result)
            },
            onError: (json: any) => {
                setIsLoading(false)
            },
        })
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
                        <ListItemText primary={recipe.name} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            )}
        </Stack>
    )
}

export default RecipeListPage