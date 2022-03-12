import Box from "@material-ui/core/Box";

interface Props {
    spacing: number
}

export default function Spacing(props: Props) {
    return <Box sx={{ width: 0, height: 0, m: props.spacing }} />
}