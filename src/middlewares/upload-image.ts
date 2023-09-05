import { Request } from "express";
import { ApiError } from "../lib/apiError";

import multer from 'multer';

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudnairy } = require('../config/index')
const maxFileSizeInBytes = 5 * 1024 * 1024; // 5MB

// Configuration 

cloudinary.config(cloudnairy);


const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params :     {
    folder : 'user-images',
    public_id :  (req:Request, file: multer.File) => {
      const { userName } = req.body
      const myFileName = `${userName}-${Date.now()}-${file.originalname.split('.')[0]}`;
      return myFileName;
    },
    },

    
});
const fileFilter = (req:Request, file : multer.File, callback: (error: ApiError | null, acceptFile: boolean) => void) => {   

  if (file.mimetype.split("/")[0] !== "image") {
      return callback(new ApiError('Only images are allowed', 400), null);
    }
  // if (!['png', 'jpg', 'jpeg'].includes(file.mimetype.split('/')[1])) {
  //     return callback(new ApiError('Only images are allowed', 400), null);
  //   }
    return callback(null, true);  
  }
const upload = multer({
  storage,
  limits : {
    fileSize : maxFileSizeInBytes, // 5MB
  },

  fileFilter 
  });

  const deleteImageByUrl = async (imageUrl) => {
    const publicId = cloudinary.utils.extractPublicId(imageUrl);
    cloudinary.uploader.destroy(publicId, function(err, result) { console.log(result) });
  }
const removeImage = async(url) =>{
  if(url === 'https://res.cloudinary.com/dttgbrris/image/upload/v1681003634/3899618_mkmx9b.png') return;
  cloudinary.uploader.destroy(url, { resource_type : 'image'})
}


module.exports = { upload, removeImage, deleteImageByUrl};
