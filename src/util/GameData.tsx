export enum SquareData {
  X = "X",
  O = "O",
}

export class Player {
  private currentMove = SquareData.X;

  constructor(data?: SquareData) {
    if (data) {
      this.currentMove = data;
    }
  }

  static fromPlayer(p: Player) {
    return new Player(p.getCurrentMove());
  }

  static fromStep(step: number) {
    if (step % 2 === 0) {
      return new Player();
    }
    return new Player(SquareData.O);
  }

  getCurrentMove() {
    return this.currentMove;
  }

  getNextStep() {
    if (this.currentMove === SquareData.X) {
      this.currentMove = SquareData.O;
    } else {
      this.currentMove = SquareData.X;
    }
  }
}

export interface GameState {
  history: BoardState[];
  stepNumber: number;
  currentPlayer: Player;
}

export interface BoardProps {
  board: BoardState;
  onClick: (i: number) => void;
}

export type BoardState = SquareData[];
