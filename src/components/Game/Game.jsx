import React, {useContext, useEffect} from 'react'
import Button from '../Button/Button'
import './game.scss'
import GameContext from '../../store/game-context'
import Cell from '../Cell/Cell';
import Board from '../Board/Board';
export default function Game() {
    const gameCtx = useContext(GameContext);

  return (
    <div>
        <header>Minesweeper</header>
        <div className='level-container'>
            <Button onClick={gameCtx.onSelectLevel.bind(null, 3)}>Low</Button>
            <Button onClick={gameCtx.onSelectLevel.bind(null, 5)}>Medium</Button>
            <Button onClick={gameCtx.onSelectLevel.bind(null, 7)}>High</Button>
        </div>
        <Board />
    </div>
  )
}
