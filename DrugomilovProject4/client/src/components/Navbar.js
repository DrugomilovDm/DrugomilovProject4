import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHistory}from 'react-router-dom'

export const Navbar=()=>{
    const history=useHistory();
    const auth =useContext(AuthContext)

    const logoutHandler=event=>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div>
                <ul className="right hide-on-med-and-down">
                    <li><a href="/" onClick={logoutHandler}>Выйти </a></li>
                </ul>
            </div>
        </nav>
    )
}