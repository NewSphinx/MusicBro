import React, { useEffect, useState, useContext } from 'react';
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

    const handleLike = (feel: string, song: SongType) => {
        if (feel === 'like') {
            if (song.like) {
                likeDislike({ downloadUrl: song.downloadUrl, like: false, dislike: false })
            } else {
                likeDislike({ downloadUrl: song.downloadUrl, like: true, dislike: false })
            }

        } else {
            if (song.dislike) {
                likeDislike({ downloadUrl: song.downloadUrl, like: false, dislike: false })
            } else {
                likeDislike({ downloadUrl: song.downloadUrl, like: false, dislike: true })
            }
        }
    }

    const handlePlay = (songs: Array<SongType>, playlistName: string, song: SongType, play: boolean) => {
        if (play) {
            globalDispatch({
                type: 'playSong',
                payload: {
                    currentSong: {
                        id: song.id,
                        title: song.title
                    },
                    playlist: {
                        name: playlistName,
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
                    ? <List songs={allSongs} handleLike={handleLike} handlePlay={handlePlay} currentSongId={globalState.currentSong.id} playing={globalState.playing} />
                    : null
            }
        </>
    )
}

export default SongList;