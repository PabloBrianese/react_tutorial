import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
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
  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function PlayersMove(props) {
  const historyDifferencePoint = (squares1, squares2) => {
    for (let i = 0; i < squares1.length; ++i)
      if (squares1[i] !== squares2[i])
        return { player: squares1[i], square: i };
    
    return null;
  }

  const squareCoordinates = squareIndex => ({
    x: squareIndex % 3 + 1,
    y: Math.floor(squareIndex / 3) + 1,
  });


  if (props.hist.length > props.move + 1) {
    const board1 = props.hist[props.move + 1];  // board at the end of move
    const board2 = props.step;  // board at the beginning of move
    const lastMove = historyDifferencePoint(board1.squares, board2.squares);
    const selectedSquare = (lastMove) ?
      squareCoordinates(lastMove.square) :
      null;

    return (
      <p>
        {player(props.move)} picks {" "} {JSON.stringify(selectedSquare)}
      </p>
    );
  }
  else {
    return (null);
  }
}

const player = move => !(move % 2) ? 'X' : 'O';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
    }
  }

  handleClick(i) {
    const state = this.state;
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = player(state.stepNumber);

    console.log(history.length)
    console.log(squares[i]);

    this.setState({
      history: history.concat([{squares}]),
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status = (winner) ?
      'Winner: ' + winner :
      'Next player: ' + player(this.state.stepNumber);

    const timeTravelDesc = move => move ?
      'Go to move #' + move :
      'Go to game start';

    const moves = history.map((step, move, hist) => {
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {timeTravelDesc(move)}
          </button>
          <PlayersMove step={step} move={move} hist={hist} /> 
        </li>
      );
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
