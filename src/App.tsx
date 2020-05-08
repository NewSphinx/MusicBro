import React, { useState } from 'react';
import './App.css';
import Player from './components/player'
import { PlayingContext } from './GlobalContext'

function App() {
  const [playing, setPlaying] = useState(false);
  const [playerSize, setPlayerSize] = useState('min');


  return (
    <div className="App">
      <PlayingContext.Provider value={{
        playing,
        setPlaying
      }}>
        <Player size={playerSize} setSize={setPlayerSize} />
      </PlayingContext.Provider>
    </div>
  );
}

export default App;
