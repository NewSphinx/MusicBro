import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import MaxPlayer from './components/maxPlayer'
import MinPlayer from './components/minPlayer';
import Queue from './components/Queue';

import { GlobalStateType } from '../../utils';

type PlayerProps = {
    size: String,
    setSize: Function,
    globalState: GlobalStateType,
    globalDispatch: any
}
const Player = ({ size, setSize, globalState, globalDispatch }: PlayerProps) => {

    const [showQueue, setShowQueue] = useState(false);
    const [seek, setSeek] = useState(0);

    const handlePlayPause = () => {
        globalDispatch({ type: 'flipPlaying' });
    }


    return (
        <Container display={(size === 'hide') ? false : true}>
            {
                size === 'max' && !showQueue
                    ? <MaxPlayer playing={globalState.playing} handlePlayPause={handlePlayPause} setSize={setSize} setShowQueue={setShowQueue} />
                    : null
            }
            {
                size === 'min' && <MinPlayer playing={globalState.playing} currentSong={globalState.currentSong} handlePlayPause={handlePlayPause} setSize={setSize} seek={seek} />
            }
            {
                showQueue
                    ? <Queue setShowQueue={setShowQueue} songs={globalState.queue.list} playlist={globalState.queue.playlistName} currentSongId={globalState.currentSong.id} playing={globalState.playing} globalDispatch={globalDispatch} />
                    : null
            }
        </Container>
    )
}

export default Player;

interface ContainerProps {
    display: boolean
}
const Container = styled.div<ContainerProps>`
    
    top: 0;
    left: 0;
    z-index: 100;
    display: ${(props: any) => props.display ? '' : 'none'}
`;