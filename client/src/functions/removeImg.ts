// import axios from 'axios';
// import { HmacSHA1, enc } from 'crypto-js';
//import cloudinary from 'cloudinary';
// // eslint-disable-next-line @typescript-eslint/no-var-requires

// export const removeImg = async (publicId: string) => {
//     cloudinary.v2.uploader.destroy(publicId, function(error,result) {
//       console.log(result, error) })
//       .then(resp => console.log(resp))
//       .catch(err=> console.log(err));
// }

// export const removeImg = async (imgURL: string) => {
//   const publicId = await getPublicId(imgURL);
//   const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//   const timestamp = new Date().getTime();
//   const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
//   const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
//   const signature = generateSHA1(generateSignature(publicId, apiSecret));
//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

//   try {
//     const response = await axios.post(url, {
//       public_id: publicId,
//       signature: signature,
//       api_key: apiKey,
//       timestamp: timestamp,
//     });
//     return response;

//   } catch (error) {
//     console.error(error);
//   }
// };

// const getPublicId = async (imgURL: string) => {
//   const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
//   const match = imgURL.match(regex);
//   if (match) {
//     return match[1];
//   } else {
//     return "";
//   }
// };

// const generateSHA1 = (data: string) => {
//   return HmacSHA1(data, "your_secret_key").toString(enc.Hex);
// };

// const generateSignature = (publicId: string, apiSecret: string) => {
//   const timestamp = new Date().getTime();
//   return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
// };
