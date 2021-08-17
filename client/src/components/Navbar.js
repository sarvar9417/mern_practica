import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function Navbar() {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = (event)=>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <div>
            <nav className='blue'>
                <div className="nav-wrapper container">
                    <span className="brand-logo">Logo</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to='/links' >Links</NavLink></li>
                        <li><NavLink to='/create'>Crate Page</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>LogOut</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;