import { FC } from 'react'
import IArtistDataItem from '../interfaces/IArtistDataItem'
import topSongs from '../data/topSongs.json'
import ISongDataItem from '../interfaces/ISongDataItem'

interface Props {
    artist: IArtistDataItem
    rank: number
}

const Artist: FC<Props> = ({ artist, rank }) => {
    const songs = topSongs as Record<string, ISongDataItem>
    const artistsTopSong = songs[`${artist.artist}-${artist.mostWatchedSongTitle}`]
    return (
        <div className='artist-container'>
            <h1>{rank}</h1>
            {artistsTopSong && (
                <div>
                    <a href={artistsTopSong.url}>
                        <img src={artistsTopSong.thumbnail} alt='album cover' />
                    </a>
                </div>
            )}
            <div>{artist.artist}</div>
            <div>Watched {artist.watchCount} times</div>
            <div>Top Song: {artist.mostWatchedSongTitle}</div>
            <div>
                Artist last watched on {new Date(artist.lastWatchedDatetime).toLocaleString()}
            </div>
        </div>
    )
}

export default Artist
