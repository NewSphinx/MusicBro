import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';


import List from './components/List';

const songRef = db.collection("songs");

type SongListProps = {
    likeDislike: Function,
    display: boolean
}
const SongList = ({ likeDislike, display }: SongListProps) => {
    const [allSongs, setAllSongs] = useState([]);
    useEffect(() => {

    }, [])


    useEffect(() => {
        try {
            songRef.onSnapshot((querySnapshot: any) => {
                let temp = [] as any;
                querySnapshot.forEach((doc: any) => {
                    temp.push(doc.data())
                })
                setAllSongs(temp);
            })
        } catch {
            console.log("Some Error occured");
        }
    }, [])

    return (
        <>
            {
                display
                    ? <List songs={allSongs} likeDislike={likeDislike} />
                    : null
            }
        </>
    )
}

export default SongList;