// import { createContext } from 'react';

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
    queue: {
        playlistName: string,
        list: Array<SongType>
    }
}
type ActionType = {
    type: string,
    payload?: any
    // {
    //     currentSong?: {
    //         id: string,
    //         title: string
    //     },
    //     playlist?: {
    //         name: string,
    //         list: Array<SongType>
    //     }
    // }
}
export const initState: GlobalStateType = {
    playing: false,
    currentSong: {
        id: '',
        title: ""
    },
    queue: {
        playlistName: '',
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
                    queue: action.payload.playlist
                }
            } else {
                throw new Error("No payload sent");
            }

        case "addToQueue":
            if (action.payload) {
                return {
                    ...state,
                    queue: {
                        ...state.queue,
                        list: [
                            ...state.queue.list,
                            action.payload.song
                        ]
                    }
                }
            } else {
                throw new Error("No payload sent");
            }
            break;

        case "queueReorder":
            if (action.payload) {
                return {
                    ...state,
                    queue: {
                        ...state.queue,
                        list: action.payload.list
                    }
                }
            }

            break;
        default:
            break;
    }
}