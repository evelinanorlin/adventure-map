export const handleImg = async (files) => {
  console.log(files)
  const img = await  {
    preview: URL.createObjectURL(files[0]),
    data: files[0],
  }
  console.log(img)
  return img
}