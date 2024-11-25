import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ConfigState {
  uuid: string | null;
  imagePath: string | null;
  stripePublicKey: string | null;
  setConfig: (data: Partial<ConfigState>) => void;
}

export const useConfigStore = create<ConfigState>()(
  devtools(
    (set) => ({
      uuid: null,
      imagePath: null,
      stripePublicKey: null,

      setConfig: (data) => set((state) => ({ ...state, ...data })),
    }),
    { name: "ConfigStore" }, // Назва, яка відображатиметься в Redux DevTools
  ),
);
