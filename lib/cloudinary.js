import { v2 as cloudinary} from "cloudinary"

export function sanitizeFileName(name) {
    return name.replace(/[^a-zA-Z0-9-_]/g, '-'); // Replaces all invalid characters with '-'
}




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImageToCloudinary = (imageBuffer, name) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ public_id: sanitizeFileName(name) }, (error, result) => {
            if (error) {
                reject(new Error(error.message));
            } else {
                resolve(result.secure_url);
            }
        });

        stream.end(imageBuffer);
    });
};


export const deleteImageFromCloudinary = async (name) => {
  try {
    await cloudinary.uploader.destroy(sanitizeFileName(name))
    return {success: true}
  } catch (error) {
    console.log(error)
    return {success: false, error: error}
  }
}






