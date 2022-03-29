import React from "react";
import { calculateWinner } from "../util/GameUtils";
import Board from "./Board";
import "./Game.css";
import { BoardState, GameState, Player } from "../util/GameData";

export default class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [Array(9).fill(null) as BoardState],
      currentPlayer: new Player(),
      stepNumber: 0,
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentBoardState = history[history.length - 1].slice();

    if (currentBoardState[i] || calculateWinner(currentBoardState)) {
      //A move is valid only on empty blocks or if the game is ongoing
      return;
    }

    currentBoardState[i] = this.state.currentPlayer.getCurrentMove();
    history.push(currentBoardState);
    const currentPlayer = Player.fromPlayer(this.state.currentPlayer);
    currentPlayer.getNextStep();

    this.setState({
      history,
      currentPlayer,
      stepNumber: history.length - 1,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      currentPlayer: Player.fromStep(step),
    });
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    const winner = calculateWinner(current);

    let status;
    if (winner) {
      status = `Winner: ${this.state.currentPlayer.getCurrentMove()}`;
    } else {
      status = `Next player: ${this.state.currentPlayer.getCurrentMove()}`;
    }

    const moves = this.state.history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board board={current} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
