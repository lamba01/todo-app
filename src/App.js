import "./App.css";
import Checkbox from "./components/checkbox";
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

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
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
      <p>{items.length}</p>

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <Checkbox /> {item.value}{" "}
              <button onClick={() => deleteItem(item.id)}>testt</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
