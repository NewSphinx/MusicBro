import React, { useContext } from 'react';
import MaxPlayer from './components/maxPlayer'
import MinPlayer from './components/minPlayer';

import { PlayingContext } from '../../GlobalContext';

type PlayerProps = {
    size: String,
    setSize: Function
}

const Player = ({ size, setSize }: PlayerProps) => {
    const { playing, setPlaying } = useContext(PlayingContext);

    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    return (
        <div>
            {
                size === 'max' && <MaxPlayer playing={playing} handlePlayPause={handlePlayPause} setSize={setSize} />
            }
            {
                size === 'min' && <MinPlayer playing={playing} handlePlayPause={handlePlayPause} setSize={setSize} />
            }
        </div>
    )
}

export default Player;