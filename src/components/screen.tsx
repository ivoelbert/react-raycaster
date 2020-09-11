import React from 'react';

import './screen.css';

interface ScreenProps {
    isOn: boolean;
    children: React.ReactNode;
}

export function Screen(props: ScreenProps): JSX.Element {
    if (props.isOn) {
        return <div className="screen">{props.children}</div>;
    } else {
        return (
            <div className="screen">
                <OffScreen />
            </div>
        );
    }
}

function OffScreen(): JSX.Element {
    return <div className="off-screen" />;
}
