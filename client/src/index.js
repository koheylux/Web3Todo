import React from 'react';
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { TransactionProvider } from './context/TransactionContext';

const root = createRoot(document.getElementById("root"));

root.render(
  <TransactionProvider>
    <App />
  </TransactionProvider>
);