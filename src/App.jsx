import { useState } from "react";
import Square from "./components/Square";
import "./App.css";

const XPLAYER = "X";
const OPLAYER = "O";
//steps
//1) create square component
//2) create board component
//3) display x or y dynamically
//4) calculate game winner
//5) show player making the turn
//6) restart game
function App() {
  const [name, setName] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(XPLAYER);
  const [playerWon, setPlayerWon] = useState("");
  const [winnerColor, setWinnerColor] = useState("");
  const [winningIndex, setWinningIndex] = useState([]);
  const [cardArray, setCardArray] = useState(Array(9).fill(null));
  const calculateWinner = (cardArray) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];

      if (
        cardArray[a] &&
        cardArray[a] === cardArray[b] &&
        cardArray[a] === cardArray[c]
      ) {
        setPlayerWon(cardArray[a]);
        setWinningIndex([a, b, c]);
        setWinnerColor("#343b43");
        return cardArray[a];
      }
    }
    return false;
  };
  const handleRestart = () => {
    setCurrentPlayer(XPLAYER);
    setCardArray(Array(9).fill(null));
    setWinnerColor("");
    setPlayerWon("");
  };
  return (
    <div className="App">
      <h1>TIC TAC TOE</h1>
      <button onClick={handleRestart}>Restart</button>
      {/* <p>{!name ? "X has turn or enter your name:" : `${name} has turn`} </p> */}
      <p>
        {!playerWon
          ? currentPlayer.length >= 9
            ? "Game is over"
            : `${currentPlayer} has turn`
          : `Congratulation! ${playerWon} has won`}
      </p>
      <input
        type="text"
        placeholder="enter name"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <CardBoard
        setCurrentPlayer={setCurrentPlayer}
        currentPlayer={currentPlayer}
        cardArray={cardArray}
        setCardArray={setCardArray}
        calculateWinner={calculateWinner}
        winningIndex={winningIndex}
        winnerColor={winnerColor}
      />
    </div>
  );
}

const CardBoard = ({
  setCurrentPlayer,
  currentPlayer,
  cardArray,
  setCardArray,
  calculateWinner,
  winningIndex,
  winnerColor,
}) => {
  const handleClick = (index) => {
    //const id = e.target.id;
    if (calculateWinner(cardArray) || cardArray[index]) {
      return;
    }
    cardArray[index] = currentPlayer;
    setCardArray(cardArray);
    setCurrentPlayer(currentPlayer === XPLAYER ? OPLAYER : XPLAYER);
    calculateWinner(cardArray);
  };

  return (
    <div className="main--box">
      {/* <Square id="0" handleClick={handleClick} value={cardArray[0]} />
      <Square id="1" handleClick={handleClick} value={cardArray[1]} />
      <Square id="2" handleClick={handleClick} value={cardArray[2]} />
      <Square id="3" handleClick={handleClick} value={cardArray[3]} />
      <Square id="4" handleClick={handleClick} value={cardArray[4]} />
      <Square id="5" handleClick={handleClick} value={cardArray[5]} />
      <Square id="6" handleClick={handleClick} value={cardArray[6]} />
      <Square id="7" handleClick={handleClick} value={cardArray[7]} />
      <Square id="8" handleClick={handleClick} value={cardArray[8]} /> */}
      {cardArray.map((c, index) => {
        const style = {
          backgroundColor: winningIndex.includes(index) ? winnerColor : "",
        };
        return (
          <Square
            key={index}
            handleClick={() => handleClick(index)}
            value={cardArray[index]}
            winningIndex={winningIndex}
            style={style}
          />
        );
      })}
    </div>
  );
};

export default App;
