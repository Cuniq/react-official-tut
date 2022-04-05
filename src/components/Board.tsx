import Square from "./Square";
import React from "react";
import "./Board.css";
import { BoardProps } from "../util/GameData";

export default class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        squareData={this.props.board[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = [];

    for (let i = 0; i <= 2; i++) {
      squares.push(
        <div className="board-row">
          {this.renderSquare(3 * i + 0)}
          {this.renderSquare(3 * i + 1)}
          {this.renderSquare(3 * i + 2)}
        </div>
      );
    }

    return <div>{squares}</div>;
  }
}
