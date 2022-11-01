import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import TopSongs from './components/TopSongs'
import TopArtists from './components/TopArtists'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className='App'>
            <div className='container'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/topsongs' element={<TopSongs />} />
                    <Route path='/topartists' element={<TopArtists />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
