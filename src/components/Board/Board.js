import React, { useContext } from "react";
import GameContext from "../../store/game-context";
import Cell from "../Cell/Cell";
import "./board.scss";
export default function Board() {
  const gameCtx = useContext(GameContext);
  return (
    <table className="board">
      <tbody>
        {gameCtx.board &&
          gameCtx.board.map((row, indexR) => {
            return (
              <tr key={"row_" + indexR}>
                {row.map((col, indexC) => {
                  return (
                    <Cell
                      key={`${indexR},${indexC}`}
                      onClick={gameCtx.onLeftClick.bind(null, {
                        row: indexR,
                        col: indexC,
                      })}
                      value={col.value}
                      status={col.status}
                    ></Cell>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
