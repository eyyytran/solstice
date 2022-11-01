import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import TopSongs from './components/TopSongs'
import TopArtists from './components/TopArtists'

function App() {
    return (
        <div className='App'>
            <h1>Solstice Take Home Project - Andrea Tran</h1>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/topsongs' element={<TopSongs />} />
                <Route path='/topartists' element={<TopArtists />} />
            </Routes>
        </div>
    )
}

export default App
