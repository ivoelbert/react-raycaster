import React from 'react';
import { GameComponent } from './raycaster/renderer';
import { ScreenWithControls } from './components/screenWithControls';

export function App(): JSX.Element {
    return (
        <div className="app-container">
            <ScreenWithControls>
                <GameComponent />
            </ScreenWithControls>
        </div>
    );
}
