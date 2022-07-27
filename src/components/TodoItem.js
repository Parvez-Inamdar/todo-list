import React, { useState } from "react"
import { RiCloseCircleLine } from "react-icons/ri"
import { TiEdit } from "react-icons/ti"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"

export default function TodoItem({ todos, completeTodo, removeTodo }) {
  const [pageNumber, setPageNumber] = useState(0)
  const userPerPage = 3
  const pageVisited = pageNumber * userPerPage

  const pageCount = Math.ceil(todos.length / userPerPage)

  const displayTodo = todos
    .slice(pageVisited, pageVisited + userPerPage)
    .map((todo, index) => {
      return (
        <div
          className={todo.isComplete ? "cb-todo-row complete" : "cb-todo-row"}
          key={index}
        >
          <div
            className="cb-todo-name"
            key={todo.id}
            onClick={() => completeTodo(todo.id)}
          >
            {todo.text}
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

  return (
    <>
      {displayTodo}
      {todos.length > 3 ? (
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
  )
}
