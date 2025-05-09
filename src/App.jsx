import React from "react";
import { ProductProvider } from "./context/ProductContext";
import Home from "./pages/Home";

function App() {
  return (
    <ProductProvider>
      <Home />
    </ProductProvider>
  );
}

export default App;
