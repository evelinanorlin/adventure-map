import Resizer from "react-image-file-resizer";

export const handleImg = (files: FileList): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (files.length === 0) {
      reject("No files provided");
      return;
    }

    const file = files[0];

    try {
      Resizer.imageFileResizer(file, 700, 700, "WEBP", 100, 0, (uri) => {
        console.log(uri);
        if (typeof uri === "string") {
          resolve(uri);
        } else {
          reject("Unexpected type returned from Resizer");
        }
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
