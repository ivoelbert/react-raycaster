import { createArray, assertExists, mapLinear } from './utils';
import React, { useEffect, useMemo, useRef } from 'react';
import { useGame } from './gameContext';
import { useControls } from './useControls';

// Returns an array of refs, map them into divs inside a container
function useBarRefs(resolution: number) {
    const game = useGame();
    const refs = useMemo(() => {
        return createArray(resolution, () => {
            return React.createRef<HTMLDivElement>();
        });
    }, [resolution]);
    const rafId = useRef<number>(0);

    useEffect(() => {
        const loop = () => {
            const bars = game.render(resolution);
            bars.forEach((bar, idx) => {
                const divRef = refs[idx].current;
                assertExists(divRef);

                const opacity = mapLinear(bar.height * bar.height, 0, 10000, 0, 1);

                divRef.style.height = `${bar.height}px`;
                divRef.style.flex = '1';
                divRef.style.backgroundColor = bar.color;
                divRef.style.opacity = `${opacity}`;
                divRef.style.zIndex = String(Math.ceil(bar.height));
            });

            rafId.current = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(rafId.current);
        };
    }, [game, refs, resolution]);

    return refs;
}

interface GameComponentProps {
    resolution: number;
}

export function GameComponent(props: GameComponentProps): JSX.Element {
    useControls();

    const refs = useBarRefs(props.resolution);
    const bars = refs.map((ref, idx) => {
        return <div ref={ref} key={idx} />;
    });

    return <div className="render-target">{bars}</div>;
}
