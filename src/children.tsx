// src/components/ChildComponent.tsx
import React from "react";
import { useConfigStore } from "./store/configStore.ts";
const ChildComponent: React.FC = () => {
  const { uuid, imagePath, stripePublicKey } = useConfigStore();

  return (
    <div>
      <h1>Configuration</h1>
      <p>UUID: {uuid}</p>
      <p>Image Path: {imagePath}</p>
      <p>Stripe Public Key: {stripePublicKey}</p>
    </div>
  );
};

export default ChildComponent;
