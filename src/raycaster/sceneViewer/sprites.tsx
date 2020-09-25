import React, { useMemo } from 'react';
import { useFrame, useGame } from '../gameContext';
import { assertExists, createArray } from '../utils';

interface SpritesProps {
    scale: number;
}

export function Sprites(props: SpritesProps): JSX.Element {
    const refs = useSpritesRefs(props.scale);

    const sprites = refs.map((ref, idx) => {
        return <div className="scene-sprite" ref={ref} key={idx} />;
    });

    return <>{sprites}</>;
}

const SPRITE_SIZE = 1;

// Returns an array of refs, map them into divs
function useSpritesRefs(scale: number) {
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

            const { isVisible, position } = sprite;
            const size = SPRITE_SIZE * scale;
            const px = position.x * scale - size * 0.5;
            const py = position.y * scale - size * 0.5;

            divRef.style.transform = `translate(${px}px, ${py}px)`;
            divRef.style.width = `${size}px`;
            divRef.style.height = `${size}px`;
            divRef.style.backgroundColor = '#f4f4f4';
            divRef.style.opacity = `${isVisible ? 1 : 0.1}`;
        });
    });

    return refs;
}
