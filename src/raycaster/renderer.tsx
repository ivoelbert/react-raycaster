import { createArray, assertExists, mapLinear } from './utils';
import React, { useMemo } from 'react';
import { useFrame } from './gameContext';

// Returns an array of refs, map them into divs inside a container
function useGameRefs(resolution: number) {
    const refs = useMemo(() => {
        return createArray(resolution, () => {
            return React.createRef<HTMLDivElement>();
        });
    }, [resolution]);

    useFrame((game) => {
        const bars = game.renderBoundaries(resolution);
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
    });

    return refs;
}

interface GameComponentProps {
    resolution: number;
}

export function GameComponent(props: GameComponentProps): JSX.Element {
    const refs = useGameRefs(props.resolution);
    const bars = refs.map((ref, idx) => {
        return <div ref={ref} key={idx} />;
    });

    return <div className="render-target">{bars}</div>;
}
