import ListItem from "@material-ui/core/ListItem"
import ListItemButton from "@material-ui/core/ListItemButton"
import Paper from "@material-ui/core/Paper"
import Stack from "@material-ui/core/Stack"
import Typography from "@material-ui/core/Typography"
import { RecipeListItem } from "../../helpers/requests/types"

interface Props {
    item: RecipeListItem,
    onClick: () => void,
}

const RecipeListItemComponent = (props: Props) => {
    const img = props.item.img_url || process.env.PUBLIC_URL + "/gray.png"

    return (
        <ListItem component={Paper} sx={{ overflow: "hidden" }} disablePadding>
            <ListItemButton sx={{ p: 0 }} onClick={() => props.onClick()} disableGutters>
                <Stack direction="row" sx={{ width: "100%" }}>
                    <img src={img} style={{ minWidth: "40%", maxWidth: "40%", aspectRatio: "1 / 1", objectFit: "cover" }} />
                    <Stack sx={{ p: "8px" }}>
                        <Typography variant="h6" align="left">
                            {props.item.name}
                        </Typography>
                        <Typography variant="body2" align="left" color="#00000080">
                            {props.item.user}
                        </Typography>
                    </Stack>
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}

export default RecipeListItemComponent