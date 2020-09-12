import React, { useContext } from 'react';
import { Game } from './game';

const GameContext = React.createContext(new Game());

export function useGame(): Game {
    return useContext(GameContext);
}
