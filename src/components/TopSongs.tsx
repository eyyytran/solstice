import topSongs from '../data/topSongs.json'
import Song from './Song'
import ISongDataItem from '../interfaces/ISongDataItem'

const TopSongs = () => {
    const top10Songs = Object.values(topSongs).slice(0, 10)
    return (
        <div className='page top-songs'>
            {top10Songs.map((songDataItem: ISongDataItem, index) => (
                <Song
                    song={songDataItem}
                    rank={index + 1}
                    key={`${songDataItem.artist}-${songDataItem.title}`}
                />
            ))}
        </div>
    )
}

export default TopSongs
