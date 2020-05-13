import React, { useState, useEffect } from 'react';
import { useHowl, Play } from 'rehowl'
import { defaultSong, SongType } from './utils'

type HowlerProps = {
    globalState: any,
    globalDispatch: any
}
const Howler = ({ globalDispatch, globalState }: HowlerProps) => {

    const [currentSong, setCurrentSong] = useState(defaultSong);
    const [nextSong, setNextSong] = useState(defaultSong);

    const [playNext, setPlayNext] = useState(false);

    useEffect(() => {
        // whenever queue changes, set the first two songs here
        if (globalState.queue.list) {
            if (globalState.queue.list.length > 0) {
                setCurrentSong(globalState.queue.list[0]);
                console.log("CurrentSong", currentSong);
            }
            if (globalState.queue.list.length > 1) {
                setNextSong(globalState.queue.list[1])
                console.log("NextSong", nextSong);
            }
        }
    }, [globalState.queue, currentSong, nextSong]);

    useEffect(() => {
        // find the song in nextSong and set the song after that (in queue) in currentSong
        if (playNext) {
            // if the nextHowl is playing
            let currentId = nextSong.id;
            globalState.queue.list.map((song: SongType, index: number) => {
                if (currentId === song.id) {
                    console.log("CurrentSong in queue", song)
                    if (globalState.queue.list[index + 1]) {
                        console.log("currentSongNewSong", globalState.queue.list[index + 1])
                        setCurrentSong(globalState.queue.list[index + 1])
                        console.log("CurrentSong", currentSong);
                    } else {
                        console.log("queue end");
                    }
                }
                return null;
            })
        } else {
            // if the currentHowl is playing
            let currentId = currentSong.id;
            globalState.queue.list.map((song: SongType, index: number) => {
                if (currentId === song.id) {
                    console.log("NextSong in queue", song)
                    if (globalState.queue.list[index + 1]) {
                        console.log("nextSongNewSong", globalState.queue.list[index + 1])
                        setNextSong(globalState.queue.list[index + 1])
                        console.log("NextSong", nextSong);
                    } else {
                        console.log("queue end");
                    }
                }
                return null;
            })
        }
    }, [playNext, nextSong, globalState.queue, currentSong])

    // const handleCurrentEnd = () => {
    //     setPlayNext(true);
    // }
    // const handleNextEnd = () => {
    //     setPlayNext(false);
    // }

    const {
        howl: currentHowl,
        state: currentState,
        error: currentError
    } = useHowl({
        src: new Array(currentSong.downloadUrl),
        format: ['mp3'],
        html5: true,

    });
    const {
        howl: nextHowl,
        state: nextState,
        error: nextError
    } = useHowl({
        src: new Array(nextSong.downloadUrl),
        format: ['mp3'],
        html5: true,
    });

    useEffect(() => {
        console.log("Current Error", currentError);
        console.log("Next Error", nextError);
    }, [currentError, nextError]);

    return (
        <>
            <button
                onClick={() => setPlayNext(!playNext)}
            > Next
            </button>
            <Play
                howl={playNext ? nextHowl : currentHowl}
                onEnd={() => setPlayNext(!playNext)}
                pause={globalState.playing ? false : true}
                loop={globalState.repeat === 'one' ? true : false}
            />
        </>
    )
}
export default Howler