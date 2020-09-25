import React, { useContext, useEffect } from 'react';
import { FrameCallback, Game } from './game';

const GameContext = React.createContext(new Game());

export function useGame(): Game {
    return useContext(GameContext);
}

export function useFrame(callback: FrameCallback) {
    const game = useGame();

    useEffect(() => {
        const cleanup = game.addFrameCallback(callback);

        return cleanup;
    }, [game, callback]);
}
