import React from "react";
import ReactDOM from "react-dom/client";
import Cell from "./Cell";

  randomMines(data, height, width, mines) {
    let randomrow, randomcol, minesCounter = 0;

    while (minesCounter < mines) {
      randomrow = this.getRandomNumber(width);
      randomcol = this.getRandomNumber(height);
      if (!(data[randomrow][randomcol].isMine)) {
        data[randomrow][randomcol].isMine = true;
        minesCounter++;
      }
    }
    return (data);
  }

