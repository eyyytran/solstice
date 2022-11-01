import { FC } from 'react'
import top10Artists from '../data/topArtists.json'
import Artist from './Artist'
import IArtistDataItem from '../interfaces/IArtistDataItem'
import './componentStyles.css'

const TopArtists: FC = () => {
    const topArtistArray = Object.values(top10Artists)

    return (
        <div className='top-artists-container'>
            {topArtistArray.map((artistDataItem: IArtistDataItem, index) => {
                return <Artist artist={artistDataItem} key={index} number={index + 1} />
            })}
        </div>
    )
}

export default TopArtists
