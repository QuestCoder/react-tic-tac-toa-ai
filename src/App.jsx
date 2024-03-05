import "./assets/bg-pattern.png";
import "./assets/bg-pattern-dark.png";

import Header from "./components/Header"
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { checkForWinner, deriveActivePlayer, makeAiMove } from "./utils/logic";
import { initialGameBoard } from "./utils/constants";
import GameOver from "./components/GameOver";

function App() {
  const [players, setPlayers] = useState({ "X": "Player 1", "O": "Player 2", "tie": "Tie" });
  const [gameTurnes, setGameTurnes] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurnes);

  let gameBoard = [...initialGameBoard.map(arr => [...arr])];

  gameTurnes.forEach((turn) => {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  });

  const winner = players[checkForWinner(gameBoard)];

  if (activePlayer == "O") {
    setTimeout(() => {
      if (!winner) {
        const ai = makeAiMove(gameBoard);
        handleSelectSquare(ai.row, ai.col);
      }
    }, 1000)
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurnes(prevTurnes => {
      const currentPlayer = deriveActivePlayer(prevTurnes);

      const log = {
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer
      }

      const updatedTurnes = [log, ...gameTurnes];
      return updatedTurnes;
    })
  }

  function handleRematch() {
    setGameTurnes([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: newName
      }
    })
  }

  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChange={handlePlayerName} />
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChange={handlePlayerName} />
          </ol>
          {winner && <GameOver onRematch={handleRematch} winner={winner}/>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurnes} />
      </main>
    </>
  )
}

export default App
