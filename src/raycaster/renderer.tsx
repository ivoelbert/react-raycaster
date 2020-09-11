import { createArray, assertExists, mapLinear } from './utils';
import React, { useEffect, useMemo, useRef } from 'react';
import { useGame } from './gameContext';
import { useControls } from './useControls';

// Returns an array of refs, map them into divs inside a container
function useBarRefs() {
    const game = useGame();
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

                const opacity = mapLinear(bar.height * bar.height, 0, 10000, 0, 1);

                divRef.style.height = `${bar.height}px`;
                divRef.style.width = '3px';
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
    useControls();

    const refs = useBarRefs();
    const bars = refs.map((ref, idx) => {
        return <div ref={ref} key={idx} />;
    });

    return <div className="render-target">{bars}</div>;
}
