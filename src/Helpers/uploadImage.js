import api from "./api";
import { IMAGE_API_URL } from "./baseConfig";

export default function uploadImage(encodedImage) {
  return api.post(
    "image",
    {
      image: encodedImage,
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
      },
    },
    IMAGE_API_URL
  );
}
