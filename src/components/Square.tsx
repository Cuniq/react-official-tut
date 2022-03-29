import "./Square.css";
import { SquareData } from "../util/GameData";

interface SquareProps {
  squareData: SquareData;
  onClick: () => void;
}

export default function Square(props: SquareProps) {
  return (
    <button onClick={props.onClick} className="square">
      {props.squareData}
    </button>
  );
}
