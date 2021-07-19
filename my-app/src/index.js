import React from 'react';
import { render } from 'react-snapshot';
import './index.css';

function calculateGameResult(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.every(x => x)) return 'draw';

  return null;
}

function calculateWinningLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
}


function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  );
}

function Board(props) {
  const winningLine = props.winningLine;
  function renderSquare(i) {
    const winningSquare = (winningLine) ? winningLine.includes(i) : false;
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        style={{ backgroundColor: (winningSquare) ? '#ccc' : 'white' }}
      />
    );
  }

  const squareRenderings = Array.from(Array(9), (x, i) => renderSquare(i));
  const boardRows = Array.from(Array(3), (x, i) => 
    <div className="board-row">
      {squareRenderings.slice(3*i, 3*i + 3)}
    </div>
  );

  return <div>{boardRows}</div>;
}

function PlayersMove(props) {
  const boardDifferencePoint = (board1, board2) => {
    for (let i = 0; i < board1.length; ++i)
      if (board1[i] !== board2[i]) return i;

    return null;
  }

  function squareCoordinates(squareIndex) {
    return {
      x: squareIndex % 3 + 1,
      y: Math.floor(squareIndex / 3) + 1,
    };
  }

  if (props.hist.length > props.move + 1) {
    const boardEnd = props.hist[props.move + 1].squares;  // board at the end of move
    const boardBeginning = props.step.squares;  // board at the beginning of move
    const squareIndex = boardDifferencePoint(boardEnd, boardBeginning);
    const selectedSquare = squareCoordinates(squareIndex);
    const selectedSquareString = JSON.stringify(selectedSquare)
      .replace(/"/g, '');

    return (
      <p>
        {player(props.move)} picks {" "} {selectedSquareString}
      </p>
    );
  }
  else {
    return (null);
  }
}

const player = move => !(move % 2) ? 'X' : 'O';

function TimeTravelButton(props) {
  const timeTravelDesc = props.move ?
    'Go to move #' + props.move :
    'Go to game start';
  const fontWeight = props.move === props.stepNumber ? "bold" : "normal";

  function jumpTo(move) {
    props.setState({
      stepNumber: move,
    });
  }  

  return (
    <button
      onClick={() => jumpTo(props.move)}
      style={{fontWeight: fontWeight}}
    >
      {timeTravelDesc}
    </button>
  );
}

function HistoryOrderSwitchButton(props) {
  return <label class="switch">
    <input type="checkbox" onClick={() => props.onClick()} />
    <span class="slider" />
  </label>;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      historyOrderAscending: true,
    }
  }

  setStepNumber(newStep) {
    this.setState({ stepNumber: newStep });
  }

  changeHistoryOrder() {
    const currentValue = this.state.historyOrderAscending;
    this.setState({ historyOrderAscending: !currentValue });
  }

  handleClick(i) {
    const state = this.state;
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateGameResult(squares) || squares[i]) return;

    squares[i] = player(state.stepNumber);

    this.setState({
      history: history.concat([{squares}]),
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const gameResult = calculateGameResult(current.squares);
    const status = {
      'X': 'Winner: X',
      'O': 'Winner: O',
      'draw': 'The game ended in a draw',
      null: 'Next player: ' + player(this.state.stepNumber),
    }[gameResult];

    const winningLine = (gameResult === 'X' || gameResult === 'O') ?
      calculateWinningLine(current.squares): null;

    const moves = history.map((step, move, hist) => {
      return (
        <li key={move}>
          <TimeTravelButton
            move={move}
            stepNumber={this.state.stepNumber}
            setState={obj => this.setState(obj)}
          />
          <PlayersMove step={step} move={move} hist={hist} /> 
        </li>
      );
    })

    const reversedMoves = moves.map(x => x).reverse()
    const renderedMoves = (this.state.historyOrderAscending) ?
      moves :
      reversedMoves;

    return (
      <div className="game">
        <header>
          <HistoryOrderSwitchButton
            onClick={() => this.changeHistoryOrder()}
          />
        </header>
        <h1>Tic-tac-toe</h1>
        <div className="game-board">
          <Board
            squares={current.squares}
            winningLine={winningLine}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <ul>{renderedMoves}</ul>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

render(
  <Game />,
  document.getElementById('root')
);
