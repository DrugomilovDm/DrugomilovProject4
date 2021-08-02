import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from 'react-router-dom'
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import {Alert} from "./Alert";

export const Navbar = () => {
    const history = useHistory();
    const { request } = useHttp()
    const{setAlert,setUsers}=useContext(AuthContext)
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const deleteHandler = async () => {
        try {
            const ids = Object.keys(auth.users).filter(item => auth.users[item].checked === true);
            const data = await request('/api/users/del', 'DELETE', { ids })
            window.location.reload();
            setAlert(data);

        } catch (e) {
            setAlert(e.message)
        }
    }

    return (<>
        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
        <ButtonGroup className="me-2" aria-label="First group">
            {/*<Button variant="light">Block</Button>{' '}
      <Button variant="light">Unblock</Button>{' '}*/}
                <Button variant="light"onClick={deleteHandler}>Delete</Button>{' '}
        </ButtonGroup>
        <Button variant="light" href="/" onClick={logoutHandler}>Exit</Button>
    </ButtonToolbar>
        </>
    )
}
