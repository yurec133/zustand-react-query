// src/App.tsx
import React from "react";
import Routes from "./routes";
import AppInitializer from "./components/AppInitializer.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer />
      <Routes />
    </QueryClientProvider>
  );
};

export default App;
