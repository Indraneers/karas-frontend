export function getImageUrl(img: string) {
  return import.meta.env.VITE_MINIO_URL + '/' + import.meta.env.VITE_BUCKET_NAME + img;
}