import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { RiCloseCircleLine } from "react-icons/ri"
import { TiEdit } from "react-icons/ti"
import { Link, useParams, useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import TodoForm from "./TodoForm"

export default function PostList() {
  const [postlist, setPostList] = useState([])
  let { id } = useParams()
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0)
  const userPerPage = 5
  const pageVisited = pageNumber * userPerPage

  const pageCount = Math.ceil(postlist.length / userPerPage)

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users/1/todos"

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()

        const newTodo = [...json]
        setPostList(newTodo)

        console.log("ToDOS-JSON", json)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchData()
  }, [])

  const displayTodo = postlist
    .slice(pageVisited, pageVisited + userPerPage)
    .map((todo, index) => {
      return (
        <div
          className={todo.completed ? "cb-todo-row complete" : "cb-todo-row"}
          key={index}
        >
          <div
            className="cb-todo-name"
            key={todo.id}
            onClick={() => completeTodo(todo.id)}
          >
            {todo.title}
          </div>
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className="cb-delete-icon"
            />

            <Link to={`details/${todo.id}`}>
              <TiEdit className="cb-edit-icon" />
            </Link>
          </div>
        </div>
      )
    })

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return
    }

    const newTodos = [todo, ...postlist]

    setPostList(newTodos)
  }

  const removeTodo = id => {
    const removeArr = [...postlist].filter(todo => todo.id !== id)

    setPostList(removeArr)
  }

  const completeTodo = id => {
    let updatedTodos = postlist.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setPostList(updatedTodos)
  }

  const updatedTodo = (todoId, newValue) => {
    console.log("todoID", todoId, newValue);
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return
    }
    setPostList(prev => prev.map(item => (item.id == todoId ? newValue : item)))
  }

  const editTodo = value => {
    updatedTodo(id, value)

    navigate("/")
  }
  return (
    
    <Layout>
      <div className="cb-todo-layout">
        
        {
        
        id ? (
            
          postlist.map((todo, index) => {
            let paramIdInt = parseInt(id);
            if (paramIdInt === todo.id) {
              return (
                <div className="cb-todo-layout" key={index}>
                  <h1>Edit POST</h1>
                  <p>
                    Id: {todo.id} Name: {todo.title}
                  </p>
                  <TodoForm
                    initialValues={{
                        title: todo.title,
                        id: todo.id
                      }}
                    todos={postlist}
                    onSubmit={editTodo}
                  />
                </div>
              )
            }
          })
        ) : (
          <>
            <h1>POST List</h1>
            {displayTodo}
            {postlist.length > 5 ? (
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination-btn"}
                previousLinkClassName={"pagination-prev"}
                nextLinkClassName={"pagination-next"}
                disabledClassName={"pagination-disable"}
                activeClassName={"pagination-active"}
              />
            ) : null}
          </>
        )}
      </div>
    </Layout>
  )
}
