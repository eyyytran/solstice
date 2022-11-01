import { FC } from 'react'
import IArtistDataItem from '../interfaces/IArtistDataItem'

interface Props {
    artist: IArtistDataItem
    key: number
    number: number
}

const Artist: FC<Props> = ({ artist, number }) => {
    const lastDateWatched = new Date(artist.lastWatchedDatetime)
    return (
        <div>
            <h1>{number}</h1>
            <div>{artist.artist}</div>
            <div>{artist.watchCount}</div>
            <div>Last Watch: {lastDateWatched.toLocaleDateString()}</div>
            <div>Your Top Song: {artist.mostWatchedSongTitle}</div>
        </div>
    )
}

export default Artist
