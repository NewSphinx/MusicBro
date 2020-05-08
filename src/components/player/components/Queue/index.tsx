import React, { ReactNode, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { XCircle, Menu, Play, Pause } from "react-feather";
import { Checkbox } from "antd";

import { CurrentPlayingSong, PlayingContext } from '../../../../GlobalContext';

type SongType = {
    id: string,
    title: string,
    artist: string,
    album?: string,
    played?: number,
    lastPlayed?: Date,
    dateAdded?: Date,
    genre?: Array<string>,
    playlist?: Array<string>,
    tags?: Array<string>,
    downloadUrl?: string
}
type QueueProps = {
    setShowQueue: Function,
    songs?: Array<SongType> | any,
    playlist?: string
}
const reorder = (list: Array<SongType>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const Queue = ({ setShowQueue, songs, playlist }: QueueProps) => {
    const [list, setList] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);

    const { currentSong, setCurrentSong } = useContext(CurrentPlayingSong);
    const { playing, setPlaying } = useContext(PlayingContext)

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items: any = reorder(
            list,
            result.source.index,
            result.destination.index
        );

        setList(items);
    }
    useEffect(() => {
        setList(songs);
    }, [])

    const renderSongs = (songs: Array<SongType> | undefined) => {
        let temp: Array<ReactNode> = [];
        if (songs) {
            if (songs.length > 0) {
                songs.map((song, index) => {
                    temp.push(
                        <Draggable key={song.id} draggableId={song.id} index={index}>
                            {(provided) => (
                                <Song
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}

                                >
                                    <Checkbox style={{ gridArea: "select" }} />
                                    <SongInfo>
                                        <p>{song.title}</p>
                                        <p>{song.artist}</p>
                                    </SongInfo>
                                    {
                                        song.id === currentSong
                                            ? !playing
                                                ? <Play size={12} style={{ gridArea: "playing" }} />
                                                : <Pause size={14} style={{ gridArea: "playing" }} />
                                            : <></>
                                    }
                                    <div style={{ gridArea: "drag" }} {...provided.dragHandleProps}>
                                        <Menu />
                                    </div>

                                </Song>
                            )}
                        </Draggable>
                    )
                })
            }
        } else {
            temp.push(<p>No songs in the queue yet, add some.</p>)
        }
        return temp;
    }
    return (
        <Container>
            <TopBar>
                <XCircle onClick={() => setShowQueue(false)} />
                {
                    playlist ? <p>Playing from: {playlist}</p> : null
                }
            </TopBar>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <SongList
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {renderSongs(list)}
                            {provided.placeholder}
                        </SongList>
                    )}
                </Droppable>
            </DragDropContext>
        </Container>
    )
}
export default Queue;

const Container = styled.div`
    height: 100%;
    width: 100%;    
    display: grid;
    grid-template-rows: 1fr 9fr;
`;
const TopBar = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    place-items:center;
`;
const SongList = styled.div`
    padding: 10px;
`;

const Song = styled.div`
    text-align: start;
    padding: 5px;
    display: grid;    
    grid-template-columns: 1fr 7fr 1fr 1fr;
    grid-template-areas: "select info playing drag";
    place-items: center;
    overflow: hidden;
    
`;
const SongInfo = styled.div`
    margin-top: 5px;
    justify-self: start;
    align-self: center;
    padding-left: 5px;
    grid-area: info;
    p{
        margin-bottom: 0;
    }
`;