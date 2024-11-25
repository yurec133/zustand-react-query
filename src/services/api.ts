import axios from "axios";
export interface UuidResponse {
  uuid: string;
}

export interface ImagePathResponse {
  url: string;
}

export interface StripeKeyResponse {
  key: string;
}

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export const fetchUUID = async () => {
  const { data } = await api.get("/todos/1");
  return { uuid: data.id };
};

export const fetchImagePath = async (
  uuid: string,
): Promise<ImagePathResponse> => {
  const { data } = await api.get(`/photos/${uuid}`);
  return data;
};

export const fetchStripeKey = async () => {
  const { data } = await api.get("/posts/1"); // Replace with your endpoint
  return data;
};
