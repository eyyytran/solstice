import React from 'react'
import topSongs from '../data/topSongs.json'
import Song from './Song'
import ISongDataItem from '../interfaces/ISongDataItem'
import { Link } from 'react-router-dom'

const TopSongs = () => {
    const top10Songs = Object.values(topSongs).slice(0, 10)

    return (
        <div>
            <Link to='/'>Back</Link>
            {top10Songs.map((songDataItem: ISongDataItem, index) => {
                return <Song song={songDataItem} number={index + 1} key={index} />
            })}
        </div>
    )
}

export default TopSongs
