/**
 * Checks if a file is an image.
 * @param file File to check.
 * @param onYes Called if it is an image.
 * @param onNo Called if it isn't an image.
 */
export function isImage(file: File, onYes?: () => void, onNo?: () => void): void {
    var url = window.URL || window.webkitURL;
    var image = new Image();
    image.onload = () => {
        if (onYes)
            onYes()
    };
    image.onerror = () => {
        if (onNo)
            onNo()
    }
    image.src = url.createObjectURL(file);
}