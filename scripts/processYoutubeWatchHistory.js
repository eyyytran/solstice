var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fs = require('fs');
var NUMBER_OF_TOP_ARTISTS = 10;
var makeYouTubeThumbnailUrl = function (videoUrl) {
    var videoId = videoUrl.replace('https://www.youtube.com/watch?v=', '');
    return "https://img.youtube.com/vi/".concat(videoId, "/1.jpg");
};
var getMostRecentDatetime = function (datetime1, datetime2) {
    return new Date(datetime1) > new Date(datetime2) ? datetime1 : datetime2;
};
var cleanWatchHistory = function (data) {
    var songMap = new Map();
    data.forEach(function (watchHistoryItem) {
        // check if video is set to private
        if (!watchHistoryItem.subtitles)
            return;
        var artist = watchHistoryItem.subtitles[0].name.replace(' - Topic', '');
        var title = watchHistoryItem.title.replace('Watched ', '');
        var key = artist.concat('-', title);
        var url = watchHistoryItem.titleUrl;
        if (!songMap.has(key)) {
            songMap.set(key, {
                artist: artist,
                title: title,
                lastWatchedDatetime: watchHistoryItem.time,
                url: url,
                thumbnail: makeYouTubeThumbnailUrl(url),
                watchCount: 1
            });
        }
        else {
            var songDataItem = songMap.get(key);
            songMap.set(key, __assign(__assign({}, songDataItem), { lastWatchedDatetime: getMostRecentDatetime(songDataItem.lastWatchedDatetime, watchHistoryItem.time), watchCount: songDataItem.watchCount + 1 }));
        }
    });
    var artistMap = new Map();
    var mostWatchedSongWatchCount = 0;
    songMap.forEach(function (songDataItem) {
        var key = songDataItem.artist;
        if (!artistMap.has(key)) {
            artistMap.set(key, {
                artist: key,
                watchCount: songDataItem.watchCount,
                mostWatchedSongTitle: songDataItem.title,
                lastWatchedDatetime: songDataItem.lastWatchedDatetime
            });
        }
        else {
            var artistDataItem = artistMap.get(key);
            artistMap.set(key, __assign(__assign({}, artistDataItem), { watchCount: artistDataItem.watchCount + songDataItem.watchCount, mostWatchedSongTitle: mostWatchedSongWatchCount >= songDataItem.watchCount
                    ? artistDataItem.mostWatchedSongTitle
                    : songDataItem.title, lastWatchedDatetime: getMostRecentDatetime(artistDataItem.lastWatchedDatetime, songDataItem.lastWatchedDatetime) }));
            mostWatchedSongWatchCount = Math.max(mostWatchedSongWatchCount, songDataItem.watchCount);
        }
    });
    var songArray = Array.from(songMap.entries());
    songArray.sort(function (a, b) { return b[1].watchCount - a[1].watchCount; });
    var artistArray = Array.from(artistMap.entries());
    artistArray.sort(function (a, b) { return b[1].watchCount - a[1].watchCount; });
    var topArtists = Object.fromEntries(artistArray.slice(0, Math.min(NUMBER_OF_TOP_ARTISTS, artistArray.length)));
    try {
        fs.writeFileSync('src/data/songData.json', JSON.stringify(Object.fromEntries(songArray), null, process.env.DEBUG ? 4 : 0));
        fs.writeFileSync('src/data/artistData.json', JSON.stringify(topArtists, null, process.env.DEBUG ? 4 : 0));
        console.log('finished writing files');
    }
    catch (err) {
        console.error(err);
    }
};
cleanWatchHistory(require('../data/youtubeWatchHistory.json'));
