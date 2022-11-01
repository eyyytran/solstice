import React from 'react'
import topSongs from '../data/topSongs.json'
import Song from './Song'
import ISongDataItem from '../interfaces/ISongDataItem'

const TopSongs = () => {
    const top10Songs = Object.values(topSongs).slice(0, 10)

    return (
        <div>
            {top10Songs.map((songDataItem: ISongDataItem, index) => {
                return <Song song={songDataItem} number={index + 1} key={index} />
            })}
        </div>
    )
}

export default TopSongs
