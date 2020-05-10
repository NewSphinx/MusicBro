import React, { useContext, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { MoreVertical, PlayCircle, PauseCircle, Heart, MinusCircle } from 'react-feather';
import { SongType } from '../../../utils'

type ListProps = {
    songs: Array<SongType>,
    handleLike: Function,
    handlePlay: Function,
    currentSongId: string,
    playing: boolean
}
const List = ({ songs, handleLike, handlePlay, currentSongId, playing }: ListProps) => {

    const renderSongs = (songs: any) => {
        let temp = [];
        if (songs) {
            if (songs.length > 0) {
                songs.map((song: any, index: number) => {
                    temp.push(
                        <Song key={index}>
                            <AlbumArt alt="album art" src={song.albumArt ? song.albumArt : `${process.env.PUBLIC_URL}/default-album-art.jpg`} />

                            <Title>{song.title}</Title>
                            <Artist>{song.artist}</Artist>

                            <MoreVertical style={{ gridArea: 'options', justifySelf: 'end' }} />
                            <MinusCircle style={{ gridArea: 'dislike' }} onClick={() => handleLike("dislike", song)} color={song.dislike ? 'red' : 'black'} />
                            {
                                // replace downloadUrl here with id when all songs in firestore have a unique id
                                playing ?
                                    currentSongId === song.downloadUrl
                                        ? <PauseCircle style={{ gridArea: 'play' }} size={32} onClick={(() => handlePlay(false))} />
                                        : <PlayCircle style={{ gridArea: 'play' }} size={32} onClick={(() => handlePlay(songs, 'All songs', song, true))} />
                                    : <PlayCircle style={{ gridArea: 'play' }} size={32} onClick={(() => handlePlay(songs, 'All songs', song, true))} />
                            }
                            <Heart style={{ gridArea: 'like' }} onClick={() => handleLike("like", song)} color={song.like ? 'red' : 'black'} />
                        </Song>
                    )
                })
            } else {
                temp.push(
                    <p key={2}>Fetching....</p>
                )
            }
        } else {
            temp.push(
                <p>No songs found</p>
            )
        }
        return temp;
    }
    return (
        <Container>

            <SongsList>
                <PerfectScrollBar
                    options={{ minScrollbarLength: 0 }}
                >
                    {renderSongs(songs)}
                </PerfectScrollBar>
            </SongsList>

        </Container>
    )
}

export default List;

const Container = styled.div`    
    height: 100%;    
    
`;

const SongsList = styled.div`
    
`;

const Song = styled.div`    
    border-bottom: 2px dashed lightslategrey;
    padding: 5px;
    display:grid;    
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "albumArt artist  artist  options"
                         "albumArt title   title  title"
                         "albumArt dislike play   like ";
    place-items: center;
`;
const AlbumArt = styled.img`
    grid-area: albumArt;
    height: 100%;       
    padding: 5px;
`;
const Title = styled.p`
    grid-area: title;
    justify-self: baseline;
`;
const Artist = styled.p`
    grid-area: artist;
    justify-self: baseline;
`;