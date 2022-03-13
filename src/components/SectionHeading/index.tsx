import Typography from "@material-ui/core/Typography";
import React from "react";

interface Props {
    txt?: string,
}

/**
 * Formats text for section headers.
 */
export default function SectionHeading(props: React.PropsWithChildren<Props>) {
    return (
        <Typography variant="h4" component="h3" align="left" sx={{ ml: 2 }}>
            {props.txt}
            {props.children}
        </Typography>
    )
}