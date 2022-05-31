import React from 'react';

export function Navbar() {
    return (
        <nav>
            <div className="nav-wrapper  blue darken-1 px1">
                <a href="#" className="brand-logo right">React+TS</a>
                <ul className="left hide-on-med-and-down">
                    <li><a href="#">TS</a></li>
                    <li><a href="#">React</a></li>
                </ul>
            </div>
        </nav>

    )
}