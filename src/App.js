import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Movies from './pages/Movies'
import Series from './pages/Series'
import Home from './pages/Home'

const App = () => {

  return (
    <div className='App font-sans bg-black'>
      <div className='mx-auto max-w-7xl'>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} exact />    
          <Route path='movies' element={<Movies/>} />
          <Route path='series' element={<Series />} />
        </Routes>
        <Navbar/>
      </div>
    </div> 
  )
}

export default App
