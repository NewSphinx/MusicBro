import React, { useState } from 'react';
import Player from './components/player'
import { PlayingContext, CurrentPlayingSong } from './GlobalContext'

import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
  const [playerSize, setPlayerSize] = useState('max');


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
          <Player size={playerSize} setSize={setPlayerSize} />
        </CurrentPlayingSong.Provider>
      </PlayingContext.Provider>
    </div>
  );
}

export default App;
