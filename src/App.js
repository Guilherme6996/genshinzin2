import React from 'react';
import './App.css';
import GenshinCharacters from './Components/GenshinCharacters';

function App() {
  return (
    <div className="App">
      <h1>Genshin Impact - Lista de Personagens</h1>
      <h2 style={{ fontWeight: 'normal', fontSize: '1.2rem', color: '#555' }}>
        Infelizmente só temos os personagens que têm cartas no TCG do jogo. Quando mais cartinhas vierem, irei atualizar ;)
      </h2>
      <GenshinCharacters />
    </div>
  );
}

export default App;
