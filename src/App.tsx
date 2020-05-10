import React, { useState, useReducer, useEffect } from 'react';
import firebase from 'firebase';
import { useSwipeable } from 'react-swipeable';

import { db } from './firebase';
import Player from './components/player'
import SongList from './components/songList'
import { initState, globalReducer } from './utils'

import 'antd/dist/antd.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './App.css';
import { globalAgent } from 'https';

const songRef = db.collection("songs");
function App() {
  const [playerSize, setPlayerSize] = useState('hide');
  const [songListView, setSongListView] = useState(true);

  const [globalState, globalDispatch] = useReducer(globalReducer, initState);

  useEffect(() => {
    globalDispatch({ type: "flipPlaying" });
  }, [])

  const likeDislike = (obj: { downloadUrl: string, like: boolean, dislike: boolean }) => {
    // set Like | Dislike on the firebase datastore
    songRef.where('downloadUrl', '==', obj.downloadUrl)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          songRef.doc(doc.id).update({
            "like": obj.like,
            "dislike": obj.dislike
          })
        })
      })
  }
  const updateSong = (options: any) => {
    // Everytime the song is played change the lastPlayed time and increment the number of playedTimes
    songRef.where('downloadUrl', '==', options.downloadUrl)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          songRef.doc(doc.id).update({
            "lastPlayed": new Date(),
            "played": firebase.firestore.FieldValue.increment(1)
          })
        })
      })
  }

  const handleSwiped = (eventData: any) => {
    console.log(eventData);
    switch (eventData.dir) {
      case "Up":
        if (playerSize === 'min') {
          setPlayerSize('max');
          setSongListView(false);
        }
        if (playerSize === 'hide') {
          setPlayerSize('min');
          setSongListView(true);
        }

        break;
      case "Down":
        setPlayerSize('hide');
        setSongListView(true);
        break;
      default:
        break;
    }
  }
  const swipeConfig = {
    delta: 50,                             // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,                     // mouse doesn't still work
    rotationAngle: 0,
  }
  const swipeHandler = useSwipeable({ onSwiped: eventData => handleSwiped(eventData), ...swipeConfig })

  return (
    <div className="App" {...swipeHandler}>

      <SongList likeDislike={likeDislike} display={songListView} globalState={globalState} globalDispatch={globalDispatch} />
      <Player size={playerSize} setSize={setPlayerSize} globalState={globalState} globalDispatch={globalDispatch} />

    </div>
  );
}

export default App;
