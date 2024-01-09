export const handleImg = async (files: FileList) => {
  console.log(files)
  const img = await  {
    preview: URL.createObjectURL(files[0]),
    data: files[0],
  }
  return img
}