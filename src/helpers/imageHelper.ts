
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
 * Format an image file to be ready to be sent to the server.
 * The image is cropped, resized, and converted to a jpeg data URL.
 * Result is returned in the callback.
 * @param file Image file to optimize.
 * @param callback Called with the result.
 */
export function formatImageToURL(file: File, callback: (dataURL: string) => void): void {
    const MAX_WIDTH = 800;
    const MAX_HEIGHT = 800;

    /**
     * Creates a canvas with size (WIDTH, HEIGHT)
     * and returns the context.
     */
    const createCanvas = (width: number, height: number) => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext('2d');
    }

    var img = new Image();
    img.onload = function () {
        // Create canvas
        const canvas_width = Math.min(img.width, MAX_WIDTH)
        const canvas_height = Math.min(img.height, MAX_HEIGHT)
        const context = createCanvas(canvas_width, canvas_height)
        if (!context) return;

        // Calculate how much the image should be scaled to cover the canvas
        const img_scale = Math.max(canvas_width / img.width, canvas_height / img.height)
        const img_scaled_width = img.width * img_scale
        const img_scaled_height = img.height * img_scale

        // Calculate draw position to center the image in the canvas
        const draw_x = (canvas_width - img_scaled_width) / 2
        const draw_y = (canvas_height - img_scaled_height) / 2

        // Draw and get data URL
        context.drawImage(img, draw_x, draw_y, img_scaled_width, img_scaled_height)
        const dataURL = context.canvas.toDataURL('image/jpeg')

        // Delete canvas
        context.canvas.remove()

        callback(dataURL)
    }
    img.src = URL.createObjectURL(file);
}
