import { createArray, assertExists, mapLinear, isNotNil } from './utils';
import React, { useMemo } from 'react';
import { useFrame, useGame } from './gameContext';

// Returns an array of refs, map them into divs inside a container
function useBoundariesRefs(resolution: number) {
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

// Returns an array of refs, map them into divs inside a container
function useSpritesRefs() {
    const { scene } = useGame();
    const spritesCount = scene.level.entities.length;

    const refs = useMemo(() => {
        return createArray(spritesCount, () => {
            return React.createRef<HTMLDivElement>();
        });
    }, [spritesCount]);

    useFrame((game) => {
        const renderSprites = game.renderSprites();
        renderSprites.forEach((sprite, idx) => {
            const divRef = refs[idx].current;
            assertExists(divRef);

            const { dx, height, entity } = sprite;

            const isVisible = isNotNil(dx);
            const left = isNotNil(dx) ? dx * 100 : 0;

            divRef.style.height = `${height}px`;
            divRef.style.width = `${height}px`; // For now a square...
            divRef.style.display = `${isVisible ? 'block' : 'none'}`;
            divRef.style.left = `${left}%`;
            divRef.style.backgroundImage = `url("${entity.spriteSrc}")`; //`center / contain no-repeat`
            divRef.style.zIndex = String(Math.ceil(height));
        });
    });

    return refs;
}

interface GameComponentProps {
    resolution: number;
}

export function GameComponent(props: GameComponentProps): JSX.Element {
    const boundariesRefs = useBoundariesRefs(props.resolution);
    const spritesRefs = useSpritesRefs();

    const bars = boundariesRefs.map((ref, idx) => {
        return <div ref={ref} key={idx} />;
    });
    const sprites = spritesRefs.map((ref, idx) => {
        return <div className="sprite" ref={ref} key={idx} />;
    });

    return (
        <div className="render-target">
            {bars}
            {sprites}
        </div>
    );
}
