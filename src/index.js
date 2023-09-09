import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoList from "./components/todolist";

function App() {
  return <TodoList></TodoList>;
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
