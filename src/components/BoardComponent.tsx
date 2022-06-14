import React, { useEffect, useState } from "react";
import { Board } from "../models/figures/Board";
import { Cell } from "../models/figures/Cell";
import { Player } from "../models/figures/Player";
import { CellComponent } from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export const BoardComponent: React.FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const clickHandler = (cell: Cell) => {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      updateBoardHandler();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };

  useEffect(() => {
    highlightCellsHandler();
  }, [selectedCell]);

  const highlightCellsHandler = () => {
    board.highlightCells(selectedCell);
    updateBoardHandler();
  };

  const updateBoardHandler = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };
  return (
    <div>
    <h3>Current player {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={clickHandler}
                key={cell.id}
                cell={cell}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
