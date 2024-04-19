import React from "react";
import './css/Login.css';
import { useLocation, Link } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    // Check if the user is in one of the specified routes
    const isSpecialRoute = ['/leaderboard', '/library', '/profile'].includes(location.pathname.toLowerCase());

    return (
        <div>
            <div className="Navbar">
                <ul className="navbar-options">
                    <li className="SteamLab">SteamLab</li>
                    {isSpecialRoute ? (
                       <li className={location.pathname.toLowerCase() === "/profile" ? "active" : ""}><Link to="/profile">Profile</Link></li>
                    ) : (
                        <li className={location.pathname.toLowerCase() === "/" ? "active" : ""}><Link to="/">Login</Link></li>
                    )}
                    <li className={location.pathname.toLowerCase() === "/library" ? "active" : ""}><Link to="/library">Library</Link></li>
                    <li className={location.pathname.toLowerCase() === "/leaderboard" ? "active" : ""}><Link to="/leaderboard">Leaderboard</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
