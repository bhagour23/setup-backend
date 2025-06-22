//file upload system

//we will upload the file thorugh multer to cloudinary 

import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


cloudinary.config({ 
  cloud_name: 'my_cloud_name', 
  api_key: 'my_key', 
  api_secret: 'my_secret'

});

const uploadonCloud=async (localpath)=>{
 
   try {
     if(!localpath) return null;

    const res =await cloudinary.uploader.upload(localpath,
        {
            resource_type:"auto"
        }
    )

    console.log("file has been uploaded",res.url)
    return res ; //true/false return 
   } catch (error) {
    fs.unlinkSync(localpath)
    return null;
   }
}




// /////////////////////////
// // Uploads an image file
// /////////////////////////
// const uploadImage = async (imagePath) => {

//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       console.log(result);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };

export {uploadonCloud}