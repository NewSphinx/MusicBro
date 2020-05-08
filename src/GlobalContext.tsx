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