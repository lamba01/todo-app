// import React, { useState, useEffect } from 'react';
// import Checkbox from "./checkbox";


// function TodoList() {
//   const [newItem, setNewitem] = useState('');
//   const [items, setItems] = useState([]);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('todos'));
//     if (storedItems) {
//       setItems(storedItems);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(items));
//   }, [items]);

//   function Item() {
//     if (!newItem) {
//       alert('Enter an item!');
//       return;
//     }
//     const item = {
//       id: Math.floor(Math.random() * 1000),
//       value: newItem,
//       completed: false,
//     };
//     setItems((oldlist) => [...oldlist, item]);
//     setNewitem('');
//   }

//   function deleteItem(id) {
//     const newArray = items.filter((item) => item.id !== id);
//     setItems(newArray);
//   }

//   function toggleComplete(id) {
//     setItems((oldlist) =>
//       oldlist.map((item) => {
//         if (item.id === id) {
//           return { ...item, completed: !item.completed };
//         }
//         return item;
//       })
//     );
//   }

//   function clearCompleted() {
//     const newArray = items.filter((item) => !item.completed);
//     setItems(newArray);
//   }

//   const filteredTodos = items.filter((item) => {
//     if (filter === 'completed') {
//       return item.completed;
//     } else if (filter === 'incomplete') {
//       return !item.completed;
//     }
//     return true; // 'all' filter or default
//   });

//   return (
//     <div className="App">
//       <h1>TODO</h1>
//       <input
//         type="text"
//         placeholder="Create a new todo"
//         value={newItem}
//         onChange={(e) => setNewitem(e.target.value)}
//       />
//       <button onClick={() => Item()}>Add</button>
//       <p>{items.length}</p>

//       <div>
//         <button onClick={() => setFilter('all')}>All</button>
//         <button onClick={() => setFilter('completed')}>Completed</button>
//         <button onClick={() => setFilter('incomplete')}>Incomplete</button>
//       </div>

//       <ul>
//         {filteredTodos.map((item) => {
//           return (
//             <li key={item.id}>
//               <Checkbox
//                 checked={item.completed}
//                 onChange={() => toggleComplete(item.id)}
//               />{' '}
//               {item.value}{' '}
//               <button onClick={() => deleteItem(item.id)}>Delete</button>
//             </li>
//           );
//         })}
//       </ul>

//       <button onClick={() => clearCompleted()}>Clear Completed</button>
//     </div>
//   );
// }

// export default TodoList;


import React, { useState, useEffect } from 'react';
import Checkbox from './checkbox'; // Make sure the path to your Checkbox component is correct
// import './TodoList.css'; // Import your CSS stylesheet
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList() {
  const [newItem, setNewItem] = useState('');
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

  function addItem() {
    if (!newItem) {
      alert('Please enter an item!');
      return;
    }
    const newItemObject = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed: false,
    };
    setItems((oldList) => [...oldList, newItemObject]);
    setNewItem('');
  }

  function deleteItem(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  }

  function clearCompleted() {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
  }

  function toggleComplete(id) {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  }

  function onDragEnd(result) {
    if (!result.destination) return;

    const reorderedItems = [...items];
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);
  }

  return (
    <div className="App">
      <h1>TODO</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Create a new todo"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <p>{items.length} items</p>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {items
                .filter((item) =>
                  filter === 'completed'
                    ? item.completed
                    : filter === 'active'
                    ? !item.completed
                    : true
                )
                .map((item, index) => (
                  <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Checkbox
                          id={`todo-${item.id}`}
                          checked={item.completed}
                          onChange={() => toggleComplete(item.id)}
                        />
                        <label htmlFor={`todo-${item.id}`}>
                          <span className={item.completed ? 'completed' : ''}>
                            {item.value}
                          </span>
                        </label>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default TodoList;
