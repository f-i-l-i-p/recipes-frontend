import loadingIcon from "./loadingIcon.svg"
import "./style.css"
import React from "react"

interface Props {
    style: React.CSSProperties
}

/**
 * Shows a carrot loading icon
 */
const CarrotLoading = (props: Props) => {
    return (
        <img src={loadingIcon} className="carrot-icon" style={props.style} />
    )
}

export default CarrotLoading;