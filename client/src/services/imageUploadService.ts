import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_URL;

export const uploadImage = async (img: string) => {
  const data = new FormData();
  data.append("file", img);
  console.log(data.forEach((value) => console.log(value)));
  console.log(data.values)

  try{
    const response = await axios.post(`${BASE_URL}imgUpload/upload`, data, 
    {headers: { "Content-Type": "multipart/form-data" }});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

// data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
// data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
// data.append("folder", "Cloudinary-React");

// for (const value of data.values()) {
//   console.log(value);
// }

// try {
//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${
//       import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
//     }/image/upload`,
//     {
//       method: "POST",
//       body: data,
//     },
//   );
//   const res = await response.json();
//   console.log(res);
//   return res;
// } catch (error) {
//   console.log(error);
// }