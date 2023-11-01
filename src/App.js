import React, { useState, useMemo, useRef } from 'react';
import "./App.css";
import TodoInput from './components/Todoinput';
import Todolist from './components/TodoList';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();

  const filteredTodo = useMemo(() => {
    return listTodo.filter(item => {
      return item.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [listTodo, searchTerm]);

  const addList = (inputText) => {
    if (inputText !== '') {
      setListTodo([...listTodo, inputText]);
    }
  };

  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value === '') return;
    addList(value);
    inputRef.current.value = '';
  };
  

  return (
    <div className="main-container">
      <div className="center-container">
        <div className='search-bar'>
          
        <input
  ref={inputRef}
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  type="search"
  placeholder="search here"
/>

        <br />

        <br />
        </div>
        <form onSubmit={onSubmit}>
          <TodoInput addList={addList} inputRef={inputRef} />

          
        </form>
        
        <h1 className="app-heading">TODO</h1>
        <hr />
        {filteredTodo.map((listItem, i) => {
          return (
            <Todolist key={i} index={i} item={listItem} deleteItem={deleteListItem} />
          );
        })}
      </div>
    </div>
  );
}

export default App;