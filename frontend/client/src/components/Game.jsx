import React from 'react';

const Game = ({ game, onGuess }) => {
  return (
    <div>
      <h3>{game.Name}</h3>
      <button onClick={() => onGuess(game.Name)}>Guess</button>
    </div>
  );
};

export default Game;
