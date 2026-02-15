"use server"

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File
  if (!file) {
    throw new Error("No file provided")
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "superteam-malaysia",
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error)
          reject(error)
          return
        }
        resolve(result?.secure_url)
      }
    ).end(buffer)
  })
}
