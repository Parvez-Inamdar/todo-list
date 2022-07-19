import React from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

export default function TodoList({todos, completeTodo, addTodo, removeTodo, updatedTodo}) {
    return (
        <div className='cb-todo-layout'>
            <h1>Daily Activities</h1>
            
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updatedTodo={updatedTodo}/>
        </div>
    )
}
