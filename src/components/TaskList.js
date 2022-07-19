import React, { useState } from 'react';
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";

export default function TaskList() {

    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const updatedTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    }

    const removeTodo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    }
    const completeTodo = (id) => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        setTodos(updatedTodos);
  }

  return (
    <Layout>
        <TodoList 
          todos = {todos}
          addTodo={addTodo}
          completeTodo={completeTodo}
          updatedTodo={updatedTodo}
          removeTodo={removeTodo}
        />
    </Layout>   
  )
}
