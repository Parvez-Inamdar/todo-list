import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "../components/Todo";


export default function Home() {    
    
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Todo />}></Route>
            <Route path="/details/:id" element={<Todo />}></Route>
        </Routes>
    </BrowserRouter> 
  )
}
