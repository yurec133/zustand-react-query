// src/App.tsx
import React, { Suspense } from "react";
import Routes from "./routes";
import AppInitializer from "./components/AppInitializer.tsx";

const App: React.FC = () => {
  /*
  TODOS:
  1. Fetch 2-3 API calls with react-query/axios on the APP level (load configuration variables like uuid, paths to images, stripe public key etc. hard code it for now or call a free api service). Sometimes there's dependencies where one api depends on the first api.
  2. Set data in zustand so it can used in any component
  3. Use suspense whereever you can
  4. Setup API calls on the page level and set data in stores.  
  5. Test to make sure it doesn't call the same API multiple times.
  
  Find a better way to do the following especially loading API... Is putting the setConfigData in useEffect the best approach?
  */

  return (
    <Suspense fallback={<div>Loading APP DATA...</div>}>
      <AppInitializer />
      <Routes />
    </Suspense>
  );
};

export default App;
