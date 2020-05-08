import React, { useContext, useState } from 'react';
import MaxPlayer from './components/maxPlayer'
import MinPlayer from './components/minPlayer';
import Queue from './components/Queue';

import { PlayingContext } from '../../GlobalContext';

type PlayerProps = {
    size: String,
    setSize: Function
}
const testSongsObj = {
    list: [
        {
            id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            title: "Creep",
            artist: "Radiohead"
        },
        {
            id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7asddcb6d',
            title: "Where did you sleep last night",
            artist: "Nirvana"
        }
    ],
    playlist: "All Songs"
}
const Player = ({ size, setSize }: PlayerProps) => {
    const [showQueue, setShowQueue] = useState(false);
    const { playing, setPlaying } = useContext(PlayingContext);

    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    return (
        <div style={{ height: "100%", width: "100%" }}>
            {
                size === 'max' && !showQueue
                    ? <MaxPlayer playing={playing} handlePlayPause={handlePlayPause} setSize={setSize} setShowQueue={setShowQueue} />
                    : null
            }
            {
                size === 'min' && <MinPlayer playing={playing} handlePlayPause={handlePlayPause} setSize={setSize} />
            }
            {
                showQueue
                    ? <Queue setShowQueue={setShowQueue} songs={testSongsObj.list} playlist={testSongsObj.playlist} />
                    : null
            }
        </div>
    )
}

export default Player;