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

  // Fetch UUID
  const {
    data: uuid,
    isLoading: isUuidLoading,
    error: uuidError,
  } = useQuery<UuidResponse>({
    queryKey: ["uuid"],
    queryFn: async () => {
      const uuid = await fetchUUID();
      setConfig({ uuid: uuid.uuid });
      return uuid;
    },
  });

  // Fetch Image Path
  const { isLoading: isImagePathLoading, error: imagePathError } =
    useQuery<ImagePathResponse>({
      queryKey: ["imagePath", uuid?.uuid],
      queryFn: async () => {
        if (!uuid?.uuid) {
          throw new Error("UUID is undefined or null");
        }
        const data = await fetchImagePath(uuid.uuid);
        setConfig({ imagePath: data.url });
        return data;
      },
      enabled: !!uuid?.uuid,
    });

  // Fetch Stripe Public Key
  const { isLoading: isStripeKeyLoading, error: stripeKeyError } =
    useQuery<StripeKeyResponse>({
      queryKey: ["stripeKey"],
      queryFn: async () => {
        const data = await fetchStripeKey();
        setConfig({ stripePublicKey: data.id });
        return data;
      },
    });

  const isLoading = isUuidLoading || isImagePathLoading || isStripeKeyLoading;

  return (
    <div>
      {isLoading && <p>Loading configuration...</p>}

      {uuidError && <p>Error loading UUID: {uuidError.message}</p>}
      {imagePathError && (
        <p>Error loading Image Path: {imagePathError.message}</p>
      )}
      {stripeKeyError && (
        <p>Error loading Stripe Key: {stripeKeyError.message}</p>
      )}
    </div>
  );
};

export default AppInitializer;
