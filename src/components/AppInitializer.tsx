import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchImagePath,
  fetchStripeKey,
  UuidResponse,
  ImagePathResponse,
  StripeKeyResponse,
  fetchUUID,
} from "../services/api";
import { useConfigStore } from "../store/configStore";

const AppInitializer: React.FC = () => {
  const setConfig = useConfigStore((state) => state.setConfig);

  const { data: uuid, error: uuidError } = useQuery<UuidResponse>({
    queryKey: ["uuid"],
    queryFn: async () => {
      const uuid = await fetchUUID();
      setConfig({ uuid: uuid.uuid });
      return uuid;
    },
  });

  const imagePathQuery = useQuery<ImagePathResponse>({
    queryKey: ["imagePath", uuid?.uuid],
    queryFn: async () => {
      if (!uuid?.uuid) {
        throw new Error("UUID is undefined or null");
      }
      try {
        const data = await fetchImagePath(uuid.uuid);
        setConfig({ imagePath: data.url });
        return data;
      } catch (error) {
        console.error("Error fetching image path:", error);
        throw error;
      }
    },
    enabled: !!uuid?.uuid,
  });

  const stripeKeyQuery = useQuery<StripeKeyResponse>({
    queryKey: ["stripeKey"],
    queryFn: async () => {
      try {
        const data = await fetchStripeKey();
        setConfig({ stripePublicKey: data.id });
        return data;
      } catch (error) {
        console.error("Error fetching Stripe key:", error);
        throw error;
      }
    },
  });

  return (
    <div>
      {uuidError && <p>Error: {uuidError.message}</p>}
      {imagePathQuery.error && <p>Error: {imagePathQuery.error.message}</p>}
      {stripeKeyQuery.error && <p>Error: {stripeKeyQuery.error.message}</p>}
    </div>
  );
};

export default AppInitializer;
