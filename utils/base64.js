import sqip from "sqip";
 
export const getBlur = (img) => {
    return sqip({
        filename: img,
        numberOfPrimitives: 10
    });
}

export function convertToSlug(text) {
    let formattedText = text.replace(/[\s.]+/g, '-').replace(/[^a-zA-Z0-9-]+/g, '-');
    formattedText = formattedText.replace(/-{2,}/g, '-');
    return formattedText;
}