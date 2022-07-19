import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Details from '../pages/details';
import Home from '../pages/index';

export default function Navbar() {
  return (
    <BrowserRouter>
      <nav>
        <h2>Todo</h2>
        <div className='link'>

            <Link to="/">Home</Link>
            <Link to="/details">Details</Link>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/details:id" element={<Details />}></Route>
      </Routes>
      
    </BrowserRouter>
  )
}
