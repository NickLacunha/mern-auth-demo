import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LOGOUT } from '../util/actions';
import { logout } from "../util/api";
import { useBookContext } from '../util/GlobalState';

function LogInOrOutButton() {

    const [state, dispatch] = useBookContext();
    const history = useHistory();

    const handleLogOut = (event) => {
        event.preventDefault();
        logout()
            .then(response => {
                dispatch({
                    type: LOGOUT
                });

                history.push("/home");
            })

    }

    return (
        <>
            {state.user.user_id
                ? <a className="navbar-brand" href="#" onClick={handleLogOut}>Log out!</a>
                : <Link className="navbar-brand px-3" to="/login">Log In!</Link>
            }
        </>
    )
}

export default LogInOrOutButton;