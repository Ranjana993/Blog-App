import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const uploadOnCloudinary = async (localfilePath) => {
  if (!localfilePath) return null;
  try {
    const res = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto"
    })
    console.log("file is uploaded ", res.url);
    return res.url
  } catch (error) {
    fs.unlinkSync(localfilePath)
    return null;
  }
}

export default uploadOnCloudinary
