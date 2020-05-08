import { createContext, useReducer, useState } from 'react';

interface PlayingContextInterface {
    playing: Boolean,
    setPlaying: Function
}
export const PlayingContext = createContext<PlayingContextInterface>({
    playing: false,
    setPlaying: () => { }
});

interface CurrentPlayingSongInterface {
    currentSong: String,
    setCurrentSong: Function
}
export const CurrentPlayingSong = createContext<CurrentPlayingSongInterface>({
    currentSong: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    setCurrentSong: () => { }
})

export type SongType = {
    id: string,
    title: string,
    artist: string,
    album?: string,
    played?: number,
    lastPlayed?: Date,
    dateAdded?: Date,
    genre?: Array<string>,
    playlist?: Array<string>,
    tags?: Array<string>,
    downloadUrl?: string,
    albumArt?: string,
    like?: boolean,
    dislike?: boolean
}