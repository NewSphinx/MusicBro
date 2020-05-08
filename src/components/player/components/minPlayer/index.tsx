import React from 'react';
import styled from 'styled-components';
import { PlayCircle, PauseCircle, Heart } from 'react-feather';
import Seeker from '../common/Seeker';

type MinPlayerProps = {
    playing: Boolean,
    handlePlayPause: Function,
    setSize: Function
}
const MinPlayer = ({ playing, handlePlayPause, setSize }: MinPlayerProps) => {
    return (
        <Container onClick={() => setSize('max')}>
            <Seeker percentage={40} color="blue" gArea={"seeker"} />
            <Heart style={{ gridArea: "like" }} />
            <Info>
                Creep - Radiohead
            </Info>
            {
                playing
                    ? <PauseCircle onClick={() => handlePlayPause()} style={{ gridArea: "play" }} />
                    : <PlayCircle onClick={() => handlePlayPause()} style={{ gridArea: "play" }} />
            }
        </Container>
    )
}

export default MinPlayer;

const Container = styled.div`
    height: 15%;
    width: 100%;
    position: fixed;
    bottom: 0;
    left:0;    
    display:grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr 5fr;
    grid-template-areas: "seeker seeker seeker"
                         "like   info   play";
    place-items: center;
`;
const Info = styled.div`
    grid-area: info;
`;