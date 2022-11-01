import { FC } from 'react'
import ISongDataItem from '../interfaces/ISongDataItem'

interface Props {
    song: ISongDataItem
    key: number
    number: number
}

const Song: FC<Props> = ({ song, number }) => {
    const lastDateWatched = new Date(song.lastWatchedDatetime)

    return (
        <div>
            <h1>{number}</h1>
            <div>
                <img src={song.thumbnail} alt='album cover' />
            </div>
            <div>
                {song.title} - {song.artist}
            </div>
            <div>Number of Watches: {song.watchCount}</div>
            <div>Last Watched: {lastDateWatched.toLocaleDateString()}</div>
        </div>
    )
}

export default Song
