import ImageKit from "imagekit"

let imagekitInstance: ImageKit | null = null

function getImageKit() {
  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    })
  }
  return imagekitInstance
}

export async function uploadToImageKit(
  file: Buffer,
  fileName: string,
  folder: string = "/circ"
): Promise<string> {
  const ik = getImageKit()
  
  const result = await ik.upload({
    file: file,
    fileName: fileName,
    folder: folder,
    useUniqueFileName: true,
  })
  
  return result.url
}
