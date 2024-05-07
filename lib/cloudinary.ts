import { CloudinaryUploadResponseType } from "@/types/cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ringantangan",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function cloudinaryUploadImage({
  fileData,
  id,
}: {
  fileData: File;
  id?: string;
}) {
  try {
    const imageArray = await fileData.arrayBuffer();
    const imageBuffer = new Uint8Array(imageArray);

    const imageUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: !!id
              ? `${id}_${new Date().toISOString()}`
              : `${
                  fileData.name && fileData.name.split(".")[0]
                }_${new Date().toISOString()}`,
            upload_preset: "ringantangan_preset",
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(imageBuffer);
    });

    return imageUpload as CloudinaryUploadResponseType;
  } catch (e) {
    throw e;
  }
}

export async function cloudinaryDeleteImage(publicId: string) {
  try {
    const deletionResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });

    return deletionResponse as CloudinaryUploadResponseType;
  } catch (e) {
    throw e;
  }
}

export default cloudinary;
