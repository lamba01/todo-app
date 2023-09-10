import React, { useState, useEffect } from 'react';
import Checkbox from './checkbox'; 
import './TodoList.css'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteBtn from '../images/icon-cross.svg'
import { FiPlus } from "react-icons/fi";
import Background from "./background"

function TodoList() {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [deletingItems, setDeletingItems] = useState([]);


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
    setDeletingItems([...deletingItems, id]);
  
  
    setTimeout(() => {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
  
      // Remove the item's ID from the deletingItems array
      setDeletingItems(deletingItems.filter((itemId) => itemId !== id));
    }, 300); 
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
  const incompleteItems = items.filter((item) => !item.completed);
  const incompleteItemsLength = incompleteItems.length;

  return (
    <div>
    <Background></Background> 
    <div className="App">
         <h1>TODO</h1>
      <div className="input-container">
        <div className="input-design"></div>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="checkbox-input"
        />
        <FiPlus onClick={addItem} className="add-btn" />
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
                        key={item.id.toString()}
                        className={`list ${deletingItems.includes(item.id) ? 'fade-animation' : ''} ${
                            item.completed ? 'completed' : ''
                          }`}
                      >
                        <Checkbox
                          id={`todo-${item.id}`}
                          checked={item.completed}
                          onChange={() => toggleComplete(item.id)}
                          className="checkbox-input"
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
                {items.length === 0 && (
                 <p className="no-items-message">No todo items left!</p>)} 
                {filter === 'completed' && 
                items.filter((item) => item.completed).length === 0 && (
                 <p className="no-items-message">No completed items</p>)}    
              {provided.placeholder}
              <div className="buttons"><span className='items-left'>{incompleteItemsLength} items left</span>
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''}onClick={() => setFilter('all')}> All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <button className='clear-completed' onClick={clearCompleted}>Clear Completed</button>
      </div>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mobile-filter-buttons">
        <button className={filter === 'all' ? 'active' : ''}onClick={() => setFilter('all')}> All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <p className='drag-text'>Drag and drop to reorder list</p>
    </div>
    </div>
  );
}

export default TodoList;
