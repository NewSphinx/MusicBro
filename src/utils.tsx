import { createContext } from 'react';

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

export type GlobalStateType = {
    playing: boolean,
    currentSong: string,
    playlistName: string,
    playlist: Array<SongType>
}
type ActionType = {
    type: string,
    payload?: {
        song?: SongType,
        playlistName?: string,
        playlist?: Array<SongType>
    }
}
export const initState: GlobalStateType = {
    playing: false,
    currentSong: '',
    playlistName: '',
    playlist: []
};

export function globalReducer(state: any, action: ActionType) {
    switch (action.type) {
        case "flipPlaying":
            return {
                ...state,
                playing: !state.playing
            }

        case "playSong":
            if (action.payload) {
                return {
                    ...state,
                    playing: true,
                    song: action.payload.song,
                    playlistName: action.payload.playlistName ? action.payload.playlistName : '',
                    playlist: action.payload.playlist ? action.payload.playlist : []
                }
            } else {
                throw new Error("No payload sent");
            }

        default:
            break;
    }
}