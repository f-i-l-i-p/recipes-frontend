/**
 * Checks if a file is an image.
 * @param file File to check.
 * @param onYes Called if it is an image.
 * @param onNo Called if it isn't an image.
 */
export function isImage(file: File, onYes?: () => void, onNo?: () => void): void {
    let url = window.URL || window.webkitURL;
    let image = new Image();
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

/**
 * Encodes an image file to base64.
 * @param file File to encode.
 * @param callback Called when result is ready.
 */
export function encodeImageFileToBase64(file: File, callback: (result: string) => void): void {
    let reader = new FileReader();
    reader.onloadend = function () {
        if (typeof reader.result == "string")
            callback(reader.result)
    }
    reader.readAsDataURL(file);
}

/**
 * Decodes base64 to a file.
 * @param dataurl Data to decode.
 * @returns A new file object.
 */
export function dataURLtoFile(dataurl: string) {
    let arr = dataurl.split(',')
    let bstr = atob(arr[1]); // TODO: Deprecated
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], "file");
}
