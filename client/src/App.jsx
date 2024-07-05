import React, { useState, useEffect, useContext } from 'react';
import { InputTodo } from './components/InputTodo';
import { RunningTodos } from './components/RunningTodos';
import { CompletedTodos } from './components/CompletedTodos';
import { TransactionContext } from './context/TransactionContext';
import "./styles.css";


export const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [runningTodos, setRunningTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const { 
    connectWallet, 
    createTodo, 
    selectAllTodos, 
    selectAllRunningTodos, 
    selectAllCompleteTodos, 
    deleteTodoById, 
    changeTodoById 
  } = useContext(TransactionContext);

  useEffect(() => {
    const initializeAsync = async () => {
      await connectWallet();
      fetchTodos();
    }
    initializeAsync();
  }, []);

  const fetchTodos = async () => {
    try {
      const activeResponse = await selectAllRunningTodos();
      const completedResponse = await selectAllCompleteTodos();
      setRunningTodos(activeResponse);
      setCompletedTodos(completedResponse);

    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const onChangeTodoText = (e) => setNewTodo(e.target.value);

  const onClickAdd = async () => {
    console.time("onClickAdd");
    if (newTodo.trim() === '') {
      return;
    }
    try {
      await createTodo(newTodo);
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
    console.timeEnd("onClickAdd");
  };

  const onClickComplete = async (id) => {
    try {
      await changeTodoById(id);
      fetchTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const onClickDeleteTodo = async (id) => {
    try {
      await deleteTodoById(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <>
      <InputTodo todoText={newTodo} onChange={onChangeTodoText} onClick={onClickAdd} disabled={runningTodos.length >= 5}/>

      {runningTodos.length >= 5 && (
        <p className='err_msg'>登録できるTODOは5個までです。</p>
      )}

      <RunningTodos todos={runningTodos} onClickComplete={onClickComplete} onClickDelete={onClickDeleteTodo}/>

      <CompletedTodos todos={completedTodos} onClickDelete={onClickDeleteTodo}/>    
    </>
  );
};
