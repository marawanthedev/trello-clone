import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Board } from "./components/Board";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </ErrorBoundary>
  );
}

export default App;
