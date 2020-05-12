import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

import { SongType, GlobalStateType } from '../../utils'

import List from './components/List';

const songRef = db.collection("songs");

type SongListProps = {
    likeDislike: Function,
    display: boolean,
    globalState: GlobalStateType,
    globalDispatch: any
}
const SongList = ({ likeDislike, display, globalState, globalDispatch }: SongListProps) => {

    const [allSongs, setAllSongs] = useState([]);

    const handleAddToQueue = (song: SongType) => {
        globalDispatch({
            type: 'addToQueue',
            payload: {
                song: song
            }
        })
    }

    const handleDelete = (song: SongType) => {

    }

    const handlePlay = (songs: Array<SongType>, playlistName: string, song: SongType, play: boolean) => {
        if (play) {
            globalDispatch({
                type: 'playSong',
                payload: {
                    currentSong: song,
                    queue: {
                        playlistName: playlistName,
                        list: songs
                    }
                }
            })
        } else {
            globalDispatch({
                type: 'flipPlaying'
            })
        }
    }

    useEffect(() => {
        // fetch the list of all songs || Paginate later
        try {
            songRef.onSnapshot((querySnapshot: any) => {
                let temp = [] as any;
                querySnapshot.forEach((doc: any) => {
                    temp.push(doc.data())
                })
                setAllSongs(temp);
            })
        } catch {
            console.log("Some Error occured");
        }
    }, [])

    return (
        <>
            {
                display
                    ? <List songs={allSongs} handleLike={likeDislike} handlePlay={handlePlay} currentSongId={globalState.currentSong.id} playing={globalState.playing} />
                    : null
            }
        </>
    )
}

export default SongList;