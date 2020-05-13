export type SongType = {
    id: string,
    title: string,
    artist: string,
    downloadUrl: string,
    album?: string,
    played?: number,
    lastPlayed?: Date,
    dateAdded?: Date,
    genre?: Array<string>,
    playlist?: Array<string>,
    tags?: Array<string>,
    albumArt?: string,
    like?: boolean,
    dislike?: boolean
}

export const defaultSong: SongType = {
    id: '',
    title: '',
    artist: '',
    downloadUrl: ''
}

export type GlobalStateType = {
    playing: boolean,
    currentSong: SongType,
    queue: {
        playlistName: string,
        list: Array<SongType>
    },
    repeat: string
}
type ActionType = {
    type: string,
    payload?: any
}
export const initState: GlobalStateType = {
    playing: false,
    currentSong: defaultSong,
    queue: {
        playlistName: '',
        list: []
    },
    repeat: "none"
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
                let newQueue: Array<SongType> = [];
                newQueue.push(action.payload.currentSong);
                action.payload.queue.list.map((song: SongType) => {
                    if (newQueue[0].id !== song.id) {
                        newQueue.push(song)
                    }
                    return null;
                })

                return {
                    ...state,
                    playing: true,
                    currentSong: action.payload.currentSong,
                    queue: {
                        list: newQueue,
                        name: action.payload.queue.name
                    }
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

        case "likeDislike":
            if (action.payload) {
                return {
                    ...state,
                    currentSong: {
                        ...state.currentSong,
                        ...action.payload
                    }
                }
            } else {
                return {
                    ...state
                }
            }


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

        case "setRepeat":
            return {
                ...state,
                repeat: action.payload.repeat
            }

        default:
            break;
    }
}