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
    globalDispatch: any,
    likeDislike: Function
}
const Player = ({ size, setSize, globalState, globalDispatch, likeDislike }: PlayerProps) => {

    const [showQueue, setShowQueue] = useState(false);
    const [seek, setSeek] = useState(20);

    const handlePlayPause = () => {
        globalDispatch({ type: 'flipPlaying' });
    }

    return (
        <Container
            display={
                (size === 'hide')
                    ? false
                    : true
            }
            size={
                size === 'min'
                    ? 'min'
                    : size === 'max'
                        ? 'max'
                        : ''
            }>
            {
                size === 'max' && !showQueue
                    ? <MaxPlayer globalState={globalState} likeDislike={likeDislike} playing={globalState.playing} handlePlayPause={handlePlayPause} setSize={setSize} setShowQueue={setShowQueue} seek={seek} />
                    : null
            }
            {
                size === 'min' && <MinPlayer likeDislike={likeDislike} playing={globalState.playing} currentSong={globalState.currentSong} handlePlayPause={handlePlayPause} setSize={setSize} seek={seek} />
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
    display: boolean,
    size: string
}
const Container = styled.div`
    position: absolute;
    width: 100%;
    height: ${(props: ContainerProps) => props.size === 'min' ? 15 : props.size === 'max' ? 100 : 0}% ;
    top: ${(props: ContainerProps) => props.size === 'min' ? 85 : props.size === 'max' ? 0 : 0}% ;
    left: 0;
    z-index: 100;
    display: ${(props: ContainerProps) => props.display ? '' : 'none'}
`;