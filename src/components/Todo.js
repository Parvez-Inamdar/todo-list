import React, {useState} from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import TodoForm from './TodoForm';
import { Link } from 'react-router-dom';
 

export default function Todo({todos, completeTodo, removeTodo, updatedTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = (value) => {
        updatedTodo(edit.id, value);
        
        setEdit({
            id: null,
            value: ''
        });
    }

    if(edit.id) {
        console.log("ID", edit.id);
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'cb-todo-row complete' : 'cb-todo-row'} key={index}>
            <div className="cb-todo-name" key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className="icons">
                <RiCloseCircleLine 
                    onClick={() => removeTodo(todo.id)}
                    className='cb-delete-icon'
                />
                <Link to={`details/${todo.id}`}>
                    <TiEdit 
                        className='cb-edit-icon'
                    />
                </Link>
                {/* <TiEdit 
                    onClick={() => setEdit({id:todo.id, value: todo.text })}
                    className='cb-edit-icon'
                /> */}
            </div>
        </div>
    ))
}
