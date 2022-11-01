import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home'>
            <h1>Click Here to Display Your Top 10 Songs</h1>
            <Link to='/topsongs'>Get Top Songs</Link>
            <h1>Click Here to Display Your Top 10 Artists</h1>
            <Link to='/topartists'>Get Top Artists</Link>
        </div>
    )
}

export default Home
