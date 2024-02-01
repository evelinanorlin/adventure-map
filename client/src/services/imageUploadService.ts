import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_URL;

export const uploadImage = async (img: string) => {
  const data = new FormData();
  data.append("file", img);
  console.log(data.forEach((value) => console.log(value)));
  console.log(data.values);

  try {
    const response = await axios.post(`${BASE_URL}imgUpload/upload`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
