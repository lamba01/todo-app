import "./App.css";
import { useState } from "react";

function App() {
  const [newItem, setNewitem] = useState("");
  const [items, setItems] = useState([]);
  function Item() {
    if (!newItem) {
      alert("enter an item!");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldlist) => [...oldlist, item]);

    setNewitem("");
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
        {items.map((item) => {
          return <li key={item.id}>{item.value}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
