import React from 'react';
import styled from 'styled-components';
import { ChevronDown, MoreVertical, MinusCircle, Heart, PauseCircle, PlayCircle, SkipBack, SkipForward, Shuffle, Repeat, List, Airplay } from 'react-feather';
import Seeker from '../common/Seeker';
import { GlobalStateType } from '../../../../utils';

type MaxPlayerProps = {
    playing: Boolean,
    globalState: GlobalStateType,
    handlePlayPause: Function,
    setSize: Function,
    setShowQueue: Function,
    seek: number,
    likeDislike: Function
}

const MaxPlayer = ({ playing, globalState, handlePlayPause, setSize, setShowQueue, seek, likeDislike }: MaxPlayerProps) => {

    return (
        <Container>
            <TopLayer>
                <ChevronDown onClick={() => setSize('min')} />
                <PlaylistInfo>
                    {globalState.queue
                        ? globalState.queue.playlistName
                            ? `Playing from ${globalState.queue.playlistName}`
                            : "Currently not playing"
                        : null
                    }
                </PlaylistInfo>
                <MoreVertical />
            </TopLayer>
            <MidLayer>
                <AlbumArt alt="album art" src={`${process.env.PUBLIC_URL}/default-album-art.jpg`} />
                <MinusCircle
                    style={
                        globalState.currentSong.dislike
                            ? { color: 'red', gridArea: 'dislike' }
                            : { gridArea: "dislike" }}
                    onClick={() => {
                        if (globalState.currentSong.id) {
                            likeDislike("dislike", globalState.currentSong)
                        }
                    }} />
                <SongInfo >
                    {<p>{globalState.currentSong.title}</p>}
                    <p>{globalState.currentSong.artist}</p>
                </SongInfo>
                <Heart
                    style={
                        globalState.currentSong.like
                            ? { color: 'red', gridArea: "like" }
                            : { gridArea: "like" }}
                    onClick={() => {
                        if (globalState.currentSong.id) {
                            likeDislike("like", globalState.currentSong)
                        }
                    }} />
            </MidLayer>
            <BottomLayer>
                <Seeker percentage={seek} color="blue" gArea={"seeker"} />

                <Shuffle style={{ gridArea: "shuffle" }} />
                <SkipBack style={{ gridArea: "prev" }} />

                {
                    playing
                        ? <PauseCircle style={{ gridArea: "play" }} size={38} onClick={() => handlePlayPause()} />
                        : <PlayCircle style={{ gridArea: "play" }} size={38} onClick={() => handlePlayPause()} />
                }

                <SkipForward style={{ gridArea: "next" }} />
                <Repeat style={{ gridArea: "repeat" }} />

                <Airplay style={{ gridArea: "airplay" }} />
                <List style={{ gridArea: "playlist" }} onClick={() => setShowQueue(true)} />

            </BottomLayer>
        </Container>
    )
}

export default MaxPlayer;

const Container = styled.div`
    background-color: white;
    padding: 5px;
    height: 100%;    
    position: absolute;
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

