import React from 'react';

import './screen.css';

interface ScreenProps {
    children: React.ReactNode;
}

export function Screen(props: ScreenProps): JSX.Element {
    return <div className="screen">{props.children}</div>;
}
