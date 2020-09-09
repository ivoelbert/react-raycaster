import React, { useContext } from 'react';
import { Game } from './game';

const DEFAULT_RESOLUTION = 320;
const GameContext = React.createContext(new Game(DEFAULT_RESOLUTION));

export function useGame(): Game {
    return useContext(GameContext);
}
