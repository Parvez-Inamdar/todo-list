import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <h2>Todo</h2>
      <div className='link'>

          <Link to="/">Home</Link>
          <Link to="/details">Details</Link>
      </div>
    </nav>
  )
}
