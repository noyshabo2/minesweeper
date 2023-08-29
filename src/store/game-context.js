import React, { useState } from "react";

const GameContext = React.createContext({
  board: null,
  level: null,
  isGameOver: false,
  onSelectLevel: (level) => {},
  onLeftClick: () => {},
});

export const GameContextProvider = (props) => {
  const [level, setLevel] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState(null);

  const isCellInBoundery = ({ row, col }, currLevel) => {
    return row >= 0 && col >= 0 && row < currLevel && col < currLevel;
  };

  const createBoard = (newlevel) => {
    const newBoard = [];
    for (let row = 0; row < newlevel; row++) {
      const newRow = [];
      for (let col = 0; col < newlevel; col++) {
        newRow.push({
          row,
          col,
          status: "close",
          value: 0,
        });
      }
      newBoard.push(newRow);
    }
    return newBoard;
  };

  const placeBoomsOnBoardAndCalculateCells = (newBoard, setBooms, newLevel) => {
    const locations = [-1, 0, 1];

    for (const boom of setBooms) {
      const currBoom = boom.split("_");
      const [boomRow, boomCol] = [parseInt(currBoom[0]), parseInt(currBoom[1])];
      newBoard[boomRow][boomCol].value = -1;

      for (const row of locations) {
        for (const col of locations) {
          if (row === 0 && col === 0) continue;
          const [rowNeighbor, colNeighbor] = [row + boomRow, col + boomCol];
          if (
            isCellInBoundery(
              { row: rowNeighbor, col: colNeighbor },
              newLevel
            ) &&
            !setBooms.has(`${rowNeighbor}_${colNeighbor}`)
          ) {
            newBoard[rowNeighbor][colNeighbor].value++;
          }
        }
      }
    }
    setBoard(newBoard);
    console.log(newBoard);
  };

  const onSelectLevel = (newlevel) => {
    const setBooms = randomBooms(newlevel);
    setLevel(newlevel);
    const newBoard = createBoard(newlevel);
    placeBoomsOnBoardAndCalculateCells(newBoard, setBooms, newlevel);
  };

  const randomBooms = (newLevel) => {
    let boomCounter = 0;
    const mapBooms = new Set();
    while (boomCounter < newLevel) {
      const row = Math.floor(Math.random() * newLevel);
      const col = Math.floor(Math.random() * newLevel);
      if (!mapBooms.has(`${row}_${col}`)) {
        mapBooms.add(`${row}_${col}`);
        boomCounter++;
      }
    }
    return mapBooms;
  };

  const revealNeighbors = ({ row, col }, currBoard) => {
    if (
      !isCellInBoundery({ row, col }, level) ||
      currBoard[row][col].value === -1 ||
      currBoard[row][col].status === "open" ||
      currBoard[row][col].status === "flag"
    ) {
      return currBoard;
    }

    currBoard[row][col].status = "open";
    if (currBoard[row][col].value > 0) {
      return currBoard;
    }

    const directions = [-1, 0, 1];
    for (const rowNeighbor of directions) {
      for (const colNeighbor of directions) {
        revealNeighbors(
          { row: rowNeighbor + row, col: colNeighbor + col },
          currBoard
        );
      }
    }
    return currBoard;
  };

  const onLeftClick = ({ row, col }) => {
    const currCell = board[row][col];
    if (currCell.status === "open" || currCell.status === "flag") {
      return;
    }
    if (currCell.value === -1) {
      setIsGameOver(true);
      return;
    } else {
      let newBoard = [...board];
      if (currCell.value > 0) newBoard[row][col].status = "open";
      if (currCell.value === 0)
        newBoard = revealNeighbors({ row, col }, newBoard);
      setBoard([...newBoard]);
    }
  };

  return (
    <GameContext.Provider
      value={{
        board: board,
        level: level,
        isGameOver: isGameOver,
        onSelectLevel: onSelectLevel,
        onLeftClick: onLeftClick,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
