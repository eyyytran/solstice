# YouTube Listen Highlights

Script that transforms Youtube Watch History into usable data and displays it in a simple React App

## Background

---

I was given a json file containing a user's Youtube watch history. Before using the data on the frontend, I wanted to transform it into a usable format before delivering it to the frontend for display, so I wrote a script in Typescript that does that during the prebuild phase and saves it to the src/data folder where it can be used by the frontend. By the end of the transformation, the original data shrinks from 4.4 Mb into two json files that are approximately 1.5Mb and 435 Kb respectively.

The goal of this exercise was to display the result of two analyses: the ten most watched music videos and one of my choice. For the top songs, the app displays the song name, artist, number of watches, thumbnail, and last date watched. For the top artists, the artist, total number of watches, most watched video, thumbnail, and last date watched are displayed. The thumbnails are clickable links to the YouTube video.

## Technologies

---

-   Javascript/Typescript
-   React.js
-   React Router

## Installation

---

To install this app, clone my repo above. In your terminal, cd into the folder containing the code and run the following lines.

If you wish to use your own Youtube Watch History, download the json file from Google and replace the youtubeWatchHistory.json file with it.

`npm i`

`npm start`

## Preview

---

![homescreen](./assets/Screen%20Shot%202022-10-31%20at%2010.11.28%20PM.png)
![topsongs](./assets/Screen%20Shot%202022-10-31%20at%2010.11.55%20PM.png)
![topartists](./assets/Screen%20Shot%202022-10-31%20at%2010.12.07%20PM.png)
