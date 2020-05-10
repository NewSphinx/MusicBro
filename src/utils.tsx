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
    currentSong: {
        id: string,
        title: string
    },
    playlist: {
        name: string,
        list: Array<SongType>
    }
}
type ActionType = {
    type: string,
    payload?: {
        currentSong?: {
            id: string,
            title: string
        },
        playlist?: {
            name: string,
            list: Array<SongType>
        }
    }
}
export const initState: GlobalStateType = {
    playing: false,
    currentSong: {
        id: '',
        title: ""
    },
    playlist: {
        name: '',
        list: []
    }
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
                    currentSong: action.payload.currentSong,
                    playlist: action.payload.playlist
                }
            } else {
                throw new Error("No payload sent");
            }

        case "addToPlaylist":
            return {
                ...state
            }

        default:
            break;
    }
}