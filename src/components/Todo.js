import React, { useState } from "react"
import TodoItem from "./TodoItem"
import TodoForm from "./TodoForm"
import Layout from "./Layout"
import { useParams, useNavigate } from "react-router-dom"

export default function Todo() {
  const [todos, setTodos] = useState([])

  let { id } = useParams()
  const navigate = useNavigate()

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return
    }

    const newTodos = [todo, ...todos]

    setTodos(newTodos)
  }

  const updatedTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
  }
  const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)

    setTodos(removeArr)
  }
  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const editTodo = value => {
    updatedTodo(id, value)

    navigate("/")
  }

  return (
    <Layout>
      <div className="cb-todo-layout">
        {id ? (
          todos.map((todo, index) => {
            if (id === todo.id) {
              return (
                <div className="cb-todo-layout" key={index}>
                  <h1>Edit Activities</h1>
                  <p>
                    Id: {todo.id} Name: {todo.text} Description:{" "}
                    {todo.description}
                  </p>
                  <TodoForm
                    initialValues={{
                      text: todo.text,
                      description: todo.description,
                    }}
                    todos={todos}
                    onSubmit={editTodo}
                  />
                </div>
              )
            }
          })
        ) : (
          <>
            <h1>Daily Activities 1</h1>
            <TodoForm onSubmit={addTodo} />
            <TodoItem
              todos={todos}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updatedTodo={updatedTodo}
            />
          </>
        )}
      </div>
    </Layout>
  )
}
