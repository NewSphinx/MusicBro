import React from 'react';
import styled from 'styled-components';
import { MoreVertical, PlayCircle, PauseCircle, Heart, MinusCircle } from 'react-feather';
import { SongType } from '../../../utils'

type SongsProps = {
    songs: Array<SongType>,
    handleLike: Function,
    handlePlay: Function,
    currentSongId: string,
    playing: boolean
}
const Songs = ({ songs, handleLike, handlePlay, currentSongId, playing }: SongsProps) => {

    const renderSongs = (songs: any) => {
        let temp = [];
        if (songs) {
            if (songs.length > 0) {
                songs.map((song: any, index: number) => {
                    temp.push(
                        <Song key={index} lastItem={(index === songs.length - 1) ? true : false}>
                            <AlbumArt alt="album art" src={song.albumArt ? song.albumArt : `${process.env.PUBLIC_URL}/default-album-art.jpg`} />

                            <Title>{song.title}</Title>
                            <Artist>{song.artist}</Artist>

                            <MoreVertical style={{ gridArea: 'options', justifySelf: 'end' }} />
                            <MinusCircle style={{ gridArea: 'dislike' }} onClick={() => handleLike("dislike", song)} color={song.dislike ? 'red' : 'black'} />
                            {
                                playing ?
                                    currentSongId === song.id
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
        <>
            {renderSongs(songs)}
        </>
    )
}

export default Songs;

interface SongProps {
    lastItem: boolean
}
const Song = styled.div` 
    max-height: 120px;
    border-bottom: 2px dashed lightslategrey;
    padding: 5px;
    display:grid;    
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "albumArt artist  artist  options"
                         "albumArt title   title  title"
                         "albumArt dislike play   like ";
    place-items: center;
    margin-bottom: ${(props: SongProps) => props.lastItem ? 15 : 0}vh
`;
const AlbumArt = styled.img`
    grid-area: albumArt;
    height: 100%;       
    padding: 5px;
`;
const Title = styled.p`
    grid-area: title;
    justify-self: baseline;
    overflow: hidden;
`;
const Artist = styled.p`
    overflow: hidden;
    grid-area: artist;
    justify-self: baseline;
`;