import React, { useState } from 'react';
import firebase from 'firebase';
import { useSwipeable } from 'react-swipeable';

import { db } from './firebase';
import Player from './components/player'
import SongList from './components/songList'
import { PlayingContext, CurrentPlayingSong } from './GlobalContext'

import 'antd/dist/antd.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './App.css';

const songRef = db.collection("songs");
function App() {
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
  const [playerSize, setPlayerSize] = useState('hide');
  const [songListView, setSongListView] = useState(true);

  const likeDislike = (obj: { downloadUrl: string, like: boolean, dislike: boolean }) => {
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
        setPlayerSize('min');
        setSongListView(false);
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
    preventDefaultTouchmoveEvent: true,   // preventDefault on touchmove, *See Details*
    trackTouch: true,                      // track touch input
    trackMouse: true,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
  }
  const swipeHandler = useSwipeable({ onSwiped: eventData => handleSwiped(eventData), ...swipeConfig })

  return (
    <div className="App" {...swipeHandler}>
      <PlayingContext.Provider value={{
        playing,
        setPlaying
      }}>
        <CurrentPlayingSong.Provider value={{
          currentSong,
          setCurrentSong
        }} >
          <SongList likeDislike={likeDislike} display={songListView} />
          <Player size={playerSize} setSize={setPlayerSize} />
        </CurrentPlayingSong.Provider>
      </PlayingContext.Provider>
    </div>
  );
}

export default App;
