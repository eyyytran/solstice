import { FC } from 'react'
import ISongDataItem from '../interfaces/ISongDataItem'

interface Props {
    song: ISongDataItem
    rank: number
}

const Song: FC<Props> = ({ song, rank }) => {
    const lastDateWatched = new Date(song.lastWatchedDatetime)
    const { url, thumbnail, artist, title, watchCount } = song
    return (
        <div className='song-container'>
            <h1>{rank}</h1>
            <div>
                <a href={url}>
                    <img src={thumbnail} alt='album cover' />
                </a>
            </div>
            <div>
                {title} - {artist}
            </div>
            <div>Watched {watchCount} times</div>
            <div>Last Watched on {lastDateWatched.toLocaleString()}</div>
        </div>
    )
}

export default Song
