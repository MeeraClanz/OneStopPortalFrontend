import "./App.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./App.css";
import React from "react";
import models from "./models/models";
import { StoreProvider, createStore } from "easy-peasy";
import Root from "./root";

const storeModel = createStore(models);

function App() {
  return (
    <StoreProvider store={storeModel}>
      <Root />
    </StoreProvider>
  );
}

export default App;
