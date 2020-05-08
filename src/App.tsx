import React, { useState } from 'react';
import Player from './components/player'
import SongList from './components/songList'
import { PlayingContext, CurrentPlayingSong } from './GlobalContext'
import { db } from './firebase';
import firebase from 'firebase';

import 'antd/dist/antd.css';
import './App.css';
const songRef = db.collection("songs");
function App() {
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
  const [playerSize, setPlayerSize] = useState('hide');

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
  return (
    <div className="App">
      <PlayingContext.Provider value={{
        playing,
        setPlaying
      }}>
        <CurrentPlayingSong.Provider value={{
          currentSong,
          setCurrentSong
        }} >
          <SongList likeDislike={likeDislike} />
          <Player size={playerSize} setSize={setPlayerSize} />
        </CurrentPlayingSong.Provider>
      </PlayingContext.Provider>
    </div>
  );
}

export default App;
