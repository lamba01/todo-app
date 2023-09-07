import React, { useState, useEffect } from 'react';
import Checkbox from './checkbox'; 
import './TodoList.css'; // Import your CSS stylesheet
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteBtn from '../images/icon-cross.svg'

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
        <div className="add-btn"></div>
        <input
          type="text"
          placeholder="Create a new todo"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>
      

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul className='main-list' ref={provided.innerRef} {...provided.droppableProps}>
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
                        className='list'
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
                        <img src={DeleteBtn} alt="close-btn" className='delete-btn' onClick={() => deleteItem(item.id)} />
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
              <div className="buttons"><span className='items-left'>{items.length} items left</span>
              <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <button className='clear-completed' onClick={clearCompleted}>Clear Completed</button>
      </div>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoList;
