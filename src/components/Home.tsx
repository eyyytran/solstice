import React from 'react'
import TopArtists from './TopArtists'
import TopSongs from './TopSongs'

const Home = () => {
    return (
        <div className='home'>
            <h1>Click Here to Display Your Top 10 Songs</h1>
            <h1>Click Here to Display Your Top 10 Artists</h1>
            <TopArtists />
        </div>
    )
}

export default Home
