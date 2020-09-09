import { createArray, assertExists, mapLinear } from './utils';
import { Game } from './game';
import React, { useContext, useEffect, useMemo, useRef } from 'react';

const DEFAULT_RESOLUTION = 320;
const GameContext = React.createContext(new Game(DEFAULT_RESOLUTION));

// Returns an array of refs, map them into divs inside a container
function useBarRefs() {
    const game = useContext(GameContext);
    const refs = useMemo(() => {
        return createArray(game.resolution, () => {
            return React.createRef<HTMLDivElement>();
        });
    }, [game.resolution]);
    const rafId = useRef<number>(0);

    useEffect(() => {
        const loop = () => {
            const bars = game.render();
            bars.forEach((bar, idx) => {
                const divRef = refs[idx].current;
                assertExists(divRef);

                const height = bar.height * 100;
                const opacity = mapLinear(height, 0, 100, 0.2, 1);

                divRef.style.height = `${height}%`;
                divRef.style.width = '2px';
                divRef.style.backgroundColor = bar.color;
                divRef.style.opacity = `${opacity}`;
            });

            rafId.current = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(rafId.current);
        };
    }, [game, refs]);

    return refs;
}

export function GameComponent(): JSX.Element {
    const refs = useBarRefs();
    const bars = refs.map((ref, idx) => {
        return <div ref={ref} key={idx} />;
    });

    return <div className="render-target">{bars}</div>;
}
