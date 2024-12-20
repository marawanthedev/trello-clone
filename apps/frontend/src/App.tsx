import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ErrorBoundary from "./components/ErrorBoundary";
import { HomePage } from "./page";

function App() {
  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <HomePage />
      </DndProvider>
    </ErrorBoundary>
  );
}

export default App;
