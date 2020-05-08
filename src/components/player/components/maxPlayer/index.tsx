import React from 'react';
import styled from 'styled-components';
import { ChevronDown, MoreVertical, MinusCircle, Heart, PauseCircle, PlayCircle, SkipBack, SkipForward, Shuffle, Repeat, List, Airplay } from 'react-feather';
import Seeker from '../common/Seeker';

const MaxPlayer = () => {
    return (
        <Container>
            <TopLayer>
                <ChevronDown />
                <PlaylistInfo>
                    Playing from Most Played
                </PlaylistInfo>
                <MoreVertical />
            </TopLayer>
            <MidLayer>
                <AlbumArt alt="album art" src={`${process.env.PUBLIC_URL}/default-album-art.jpg`} />
                <MinusCircle style={{ gridArea: "dislike" }} />
                <SongInfo >
                    <p>Creep</p>
                    <p>Radiohead</p>
                </SongInfo>
                <Heart style={{ gridArea: "like" }} />
            </MidLayer>
            <BottomLayer>
                <Seeker percentage={40} color="blue" gArea={"seeker"} />
                <Shuffle style={{ gridArea: "shuffle" }} />
                <SkipBack style={{ gridArea: "prev" }} />
                <PlayCircle style={{ gridArea: "play" }} size={38} />
                <SkipForward style={{ gridArea: "next" }} />
                <Repeat style={{ gridArea: "repeat" }} />
                <Airplay style={{ gridArea: "airplay" }} />
                <List style={{ gridArea: "playlist" }} />
            </BottomLayer>
        </Container>
    )
}

export default MaxPlayer;

const Container = styled.div`
    padding: 5px;
    height: 100vh;    
    display: grid;
    grid-template-rows: 1fr 5fr 2fr;
    z-index: 1;
`;
const TopLayer = styled.div`
    padding: 5px;    
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    justify-items: center;
`;
const PlaylistInfo = styled.div``;

const MidLayer = styled.div`
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 5fr 1fr;
    grid-template-areas: "albumArt albumArt albumArt"
                         "dislike  info     like";
    align-items: center;
    justify-items: center;
`;
const AlbumArt = styled.img`
    width: 80%;
    grid-area: albumArt;
`;

const SongInfo = styled.div`
    grid-area: info;
`;

const BottomLayer = styled.div`
    padding: 5px;    
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    grid-template-columns: 2fr 2fr 3fr 2fr 2fr;
    grid-template-areas: "seeker seeker seeker seeker seeker"
                         "shuffle prev  play   next   repeat"
                         "airplay empty empty  empty  playlist";
    align-items: center;
    justify-items: center;
`;

