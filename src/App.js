import "./App.css";
import { useState } from "react";

function App() {
  const [newItem, setNewitem] = useState("");
  const [items, setItems] = useState("[]");
  function Item() {
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldlist) => [...oldlist, item]);

    setNewitem("");
    console.log(item);
  }
  return (
    <div className="App">
      <h1>TODO</h1>
      <input
        type="text"
        placeholder="Create a new todo"
        value={newItem}
        onChange={(e) => setNewitem(e.target.value)}
      />
      <button onClick={() => Item()}>Add</button>

      <ul>
        <li>test</li>
      </ul>
    </div>
  );
}

export default App;
