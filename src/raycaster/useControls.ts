import { useGame } from './gameContext';
import { useEffect } from 'react';

export function useControls() {
    const { controls } = useGame();

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent): void => {
            controls.onKeyDown(e.code);
        };

        const keyUpHandler = (e: KeyboardEvent): void => {
            controls.onKeyUp(e.code);
        };

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        };
    }, [controls]);
}
