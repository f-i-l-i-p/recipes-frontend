
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface Props {
    open: boolean,
    confirmText?: string,
    cancelText?: string,
    title?: string,
    text?: string,
    dangerous?: boolean,
    handleClose: () => void,
    onConfirm?: () => void,
    onCancel?: () => void,
}

/**
 * A simple confirm dialog with a confirm and a cancel button.
 * 'onClose' should set 'open' to false for the dialog to close.
 */
const ConfirmDialog = (props: Props) => {

    const onConfirm = (): void => {
        if (props.onConfirm) {
            props.onConfirm()
        }
        props.handleClose()
    }

    const onCancel = (): void => {
        if (props.onCancel) {
            props.onCancel()
        }
        props.handleClose()
    }

    const acceptColor = props.dangerous ? "error" : "secondary"

    return (
        <Dialog
            open={props.open}
            onClose={() => onCancel()} // If the dialog is closed, count that as cancel
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="info" onClick={() => onCancel()}>{props.cancelText}</Button>
                <Button color={acceptColor} onClick={() => onConfirm()} autoFocus>{props.confirmText}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog