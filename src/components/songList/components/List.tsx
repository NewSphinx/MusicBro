import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { SongType } from '../../../utils'

import Songs from './Songs';

type ListProps = {
    songs: Array<SongType>,
    handleLike: Function,
    handlePlay: Function,
    currentSongId: string,
    playing: boolean
}
const List = ({ songs, handleLike, handlePlay, currentSongId, playing }: ListProps) => {


    return (
        <Container>
            <Scrollbars>
                <SongsList
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    {...true}
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                >
                    <Songs songs={songs} handleLike={handleLike} handlePlay={handlePlay} currentSongId={currentSongId} playing={playing} />
                </SongsList>
            </Scrollbars>
        </Container>
    )
}

export default List;

const Container = styled.div`    
    height: 100%;    
    width: 100%;
`;

const SongsList = styled.div`
    
`;
