import { FC } from 'react'
import top10Artists from '../data/topArtists.json'
import Artist from './Artist'
import IArtistDataItem from '../interfaces/IArtistDataItem'

const TopArtists: FC = () => {
    const topArtistArray = Object.values(top10Artists)
    return (
        <div className='page'>
            {topArtistArray.map((artistDataItem: IArtistDataItem, index) => (
                <Artist artist={artistDataItem} key={artistDataItem.artist} rank={index + 1} />
            ))}
        </div>
    )
}

export default TopArtists
