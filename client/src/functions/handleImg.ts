export const handleImg = async (files: FileList) => {
  if (files.length === 0) return
  const img = await  {
    preview: URL.createObjectURL(files[0]),
    data: files[0],
  }
  return img
}