import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';


import List from './components/List';

const songRef = db.collection("songs");

type SongListProps = {
    likeDislike: Function
}
const SongList = ({ likeDislike }: SongListProps) => {
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
        <List songs={allSongs} likeDislike={likeDislike} />
    )
}

export default SongList;