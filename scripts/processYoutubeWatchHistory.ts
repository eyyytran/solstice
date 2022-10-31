const fs = require('fs')

const NUMBER_OF_TOP_ARTISTS = 10

type WatchHistoryItem = {
    header: string
    title: string
    titleUrl: string
    subtitles: {
        name: string
        url: string
    }[]
    time: any
    products: string[]
    activityControls: string[]
}

type WatchHistory = WatchHistoryItem[]

type SongDataItem = {
    artist: string
    title: string
    lastWatchedDatetime: string
    url: string
    thumbnail: string
    watchCount: number
}

type ArtistDataItem = {
    artist: string
    watchCount: number
    mostWatchedSongTitle: string
    lastWatchedDatetime: string
}

const makeYouTubeThumbnailUrl = (videoUrl: string) => {
    const videoId = videoUrl.replace('https://www.youtube.com/watch?v=', '')
    return `https://img.youtube.com/vi/${videoId}/1.jpg`
}

const getMostRecentDatetime = (datetime1: string, datetime2: string) =>
    new Date(datetime1) > new Date(datetime2) ? datetime1 : datetime2

const cleanWatchHistory = (data: WatchHistory) => {
    const songMap = new Map<string, SongDataItem>()

    data.forEach((watchHistoryItem: WatchHistoryItem) => {
        // check if video is set to private
        if (!watchHistoryItem.subtitles) return

        const artist = watchHistoryItem.subtitles[0].name.replace(' - Topic', '')
        const title = watchHistoryItem.title.replace('Watched ', '')
        const key = artist.concat('-', title)
        const url = watchHistoryItem.titleUrl

        if (!songMap.has(key)) {
            songMap.set(key, {
                artist,
                title,
                lastWatchedDatetime: watchHistoryItem.time,
                url,
                thumbnail: makeYouTubeThumbnailUrl(url),
                watchCount: 1,
            })
        } else {
            const songDataItem = songMap.get(key) as SongDataItem
            songMap.set(key, {
                ...songDataItem,
                lastWatchedDatetime: getMostRecentDatetime(
                    songDataItem.lastWatchedDatetime,
                    watchHistoryItem.time
                ),
                watchCount: songDataItem.watchCount + 1,
            })
        }
    })

    const artistMap = new Map<string, ArtistDataItem>()

    let mostWatchedSongWatchCount = 0
    songMap.forEach((songDataItem: SongDataItem) => {
        const key = songDataItem.artist
        if (!artistMap.has(key)) {
            artistMap.set(key, {
                artist: key,
                watchCount: songDataItem.watchCount,
                mostWatchedSongTitle: songDataItem.title,
                lastWatchedDatetime: songDataItem.lastWatchedDatetime,
            })
        } else {
            const artistDataItem = artistMap.get(key) as ArtistDataItem
            artistMap.set(key, {
                ...artistDataItem,
                watchCount: artistDataItem.watchCount + songDataItem.watchCount,
                mostWatchedSongTitle:
                    mostWatchedSongWatchCount >= songDataItem.watchCount
                        ? artistDataItem.mostWatchedSongTitle
                        : songDataItem.title,
                lastWatchedDatetime: getMostRecentDatetime(
                    artistDataItem.lastWatchedDatetime,
                    songDataItem.lastWatchedDatetime
                ),
            })
            mostWatchedSongWatchCount = Math.max(mostWatchedSongWatchCount, songDataItem.watchCount)
        }
    })

    const songArray = Array.from(songMap.entries())
    songArray.sort((a, b) => b[1].watchCount - a[1].watchCount)

    const artistArray = Array.from(artistMap.entries())
    artistArray.sort((a, b) => b[1].watchCount - a[1].watchCount)
    const topArtists = Object.fromEntries(
        artistArray.slice(0, Math.min(NUMBER_OF_TOP_ARTISTS, artistArray.length))
    )

    try {
        fs.writeFileSync(
            'src/data/songData.json',
            JSON.stringify(Object.fromEntries(songArray), null, process.env.DEBUG ? 4 : 0)
        )
        fs.writeFileSync(
            'src/data/artistData.json',
            JSON.stringify(topArtists, null, process.env.DEBUG ? 4 : 0)
        )
        console.log('finished writing files')
    } catch (err) {
        console.error(err)
    }
}

cleanWatchHistory(require('../data/youtubeWatchHistory.json'))
