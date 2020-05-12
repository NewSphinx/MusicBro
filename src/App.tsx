import React, { useState, useReducer, useEffect } from 'react';
import firebase from 'firebase';
import { useSwipeable } from 'react-swipeable';
import { useHowl, Play } from 'rehowl';

import { db } from './firebase';
import Player from './components/player'
import SongList from './components/songList'
import { initState, globalReducer, SongType } from './utils'

import 'antd/dist/antd.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './App.css';

const songRef = db.collection("songs");
function AppUnMemo() {
  const [playerSize, setPlayerSize] = useState('min');
  const [menuShow, setMenuShow] = useState(false);
  const [songListView, setSongListView] = useState(true);
  const [currentSource, setCurrentSource] = useState(['']);
  const [nextSource, setNextSource] = useState(['']);

  const [globalState, globalDispatch] = useReducer(globalReducer, initState);

  useEffect(() => {
    let temp: any = [];
    temp.push(globalState.currentSong.downloadUrl);
    setCurrentSource(temp);
  }, [globalState.currentSong])

  useEffect(() => {
    // set the second song in playlist here to preload the song
    if (globalState.queue.list) {
      if (globalState.queue.list.length) {
        let temp1: any = [];
        temp1.push(globalState.queue.list[1].downloadUrl)
        setNextSource(temp1);
      }
    }
  }, [globalState.queue])

  const {
    howl: currentHowl,
    state: currentState,
    error: currentError
  } = useHowl({
    src: currentSource,
    format: ['mp3'],
    html5: true,

  });
  const {
    howl: nextHowl,
    state: nextState,
    error: nextError
  } = useHowl({
    src: nextSource,
    format: ['mp3'],
    html5: true,
  });

  useEffect(() => {
    console.log("Current Error", currentError);
    console.log("Next Error", nextError);
  }, [currentError, nextError])

  const likeDislikeBackend = (obj: { id: string, like: boolean, dislike: boolean }) => {
    // set Like | Dislike on the firebase datastore
    songRef.where('id', '==', obj.id)
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
  const handleLike = (feel: string, song: SongType) => {
    console.log("The handler", song)
    if (feel === 'like') {
      if (song.like) {
        likeDislikeBackend({ id: song.id, like: false, dislike: false })
        globalDispatch({
          type: "likeDislike",
          payload: {
            like: false,
            dislike: false
          }
        })
      } else {
        likeDislikeBackend({ id: song.id, like: true, dislike: false })
        globalDispatch({
          type: "likeDislike",
          payload: {
            like: true,
            dislike: false
          }
        })
      }

    } else {
      if (song.dislike) {
        likeDislikeBackend({ id: song.id, like: false, dislike: false })
        globalDispatch({
          type: "likeDislike",
          payload: {
            like: false,
            dislike: false
          }
        })
      } else {
        likeDislikeBackend({ id: song.id, like: false, dislike: true })
        globalDispatch({
          type: "likeDislike",
          payload: {
            like: false,
            dislike: true
          }
        })
      }
    }
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
        // if (playerSize === 'min') {
        //   setPlayerSize('max');
        //   setSongListView(false);
        // }
        if (playerSize === 'hide') {
          setPlayerSize('min');
          setSongListView(true);
        }
        break;

      case "Down":
        setPlayerSize('hide');
        setSongListView(true);
        break;

      case "Right":
        setMenuShow(true);
        break;

      case "Left":
        setMenuShow(false);
        break;

      default:
        break;
    }
  }

  const swipeConfig = {
    delta: 50,                             // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,                     // mouse still doesn't work
    rotationAngle: 0,
  }
  const swipeHandler = useSwipeable({ onSwiped: eventData => handleSwiped(eventData), ...swipeConfig })

  return (
    <div className="App" {...swipeHandler}>
      <Play howl={currentHowl} pause={globalState.playing ? false : true} />
      <SongList likeDislike={handleLike} display={songListView} globalState={globalState} globalDispatch={globalDispatch} />
      <Player likeDislike={handleLike} size={playerSize} setSize={setPlayerSize} globalState={globalState} globalDispatch={globalDispatch} />
    </div>
  );
}

// Hack to solve the dev server hook state update issue, doesn't effect builds sometimes it does, not yet on actual deployments but idk anymore
const App = React.memo(AppUnMemo);
export default App;