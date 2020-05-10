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
                size === 'min' && <MinPlayer playing={globalState.playing} handlePlayPause={handlePlayPause} setSize={setSize} />
            }
            {
                showQueue
                    ? <Queue setShowQueue={setShowQueue} songs={globalState.playlist} playlist={globalState.playlistName} currentSong={globalState.currentSong} playing={globalState.playing} />
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
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: ${(props: any) => props.display ? '' : 'none'}
`;