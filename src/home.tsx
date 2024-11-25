// src/pages/HomePage.tsx
import React from "react";
import ChildComponent from "./children";

const Home: React.FC = () => {
  return (
      <>
        <h1>2. Home</h1>
        <ChildComponent />
      </>
  );
};

export default Home;
