import React from 'react'
import Home from './Home'
import Form from './Form'
import {  Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
      
    <div id="app">
      <nav>
        
        <Link to ='/'> Home</Link>
        <Link to ='/order'>Order</Link>
      </nav>
      {/* Route and Routes here */}

      <Routes>
        <Route path='/order' element={<Form />} />
        
        <Route path='/' element={<Home />} />
      </Routes>
      
    </div>
      
  )
}

export default App
