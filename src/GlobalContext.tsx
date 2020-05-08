import { createContext, useReducer, useState } from 'react';

interface PlayingContextInterface {
    playing: Boolean,
    setPlaying: Function
}
export const PlayingContext = createContext<PlayingContextInterface>({
    playing: false,
    setPlaying: () => { }
});