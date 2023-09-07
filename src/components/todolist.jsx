import React, { useState, useEffect } from 'react';
import Checkbox from "./checkbox";


function TodoList() {
  const [newItem, setNewitem] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('todos'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  function Item() {
    if (!newItem) {
      alert('Enter an item!');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed: false,
    };
    setItems((oldlist) => [...oldlist, item]);
    setNewitem('');
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function toggleComplete(id) {
    setItems((oldlist) =>
      oldlist.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  }

  function clearCompleted() {
    const newArray = items.filter((item) => !item.completed);
    setItems(newArray);
  }

  const filteredTodos = items.filter((item) => {
    if (filter === 'completed') {
      return item.completed;
    } else if (filter === 'incomplete') {
      return !item.completed;
    }
    return true; // 'all' filter or default
  });

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

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      <ul>
        {filteredTodos.map((item) => {
          return (
            <li key={item.id}>
              <Checkbox
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />{' '}
              {item.value}{' '}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          );
        })}
      </ul>

      <button onClick={() => clearCompleted()}>Clear Completed</button>
    </div>
  );
}

export default TodoList;
