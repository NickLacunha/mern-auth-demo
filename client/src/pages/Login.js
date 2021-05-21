import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { signup, login } from "../util/api";
import { useBookContext } from '../util/GlobalState';
import { ERROR, LOGIN } from "../util/actions"

function Login() {
    const [state, dispatch] = useBookContext();
    const history = useHistory();

    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    const signupEmailRef = useRef();
    const signupPasswordRef = useRef();
    const usernameRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault()
        login({
            email: loginEmailRef.current.value,
            password: loginPasswordRef.current.value
        })
            .then(response => {
                dispatch({
                    type: LOGIN,
                    user: response.data
                });

                history.push("/home");
            })
            .catch(error => {
                dispatch({
                    type: ERROR
                })
            })
    }

    const handleSignup = (event) => {
        event.preventDefault()
        signup({
            email: signupEmailRef.current.value,
            password: signupPasswordRef.current.value,
            username: usernameRef.current.value
        })
            .then(response => {
                dispatch({
                    type: LOGIN,
                    user: response.data
                });

                history.push("/home");
            })
            .catch(error => {
                dispatch({
                    ERROR
                })
            })
    }

    return (
        <div className="row px-3">
            <div className="col-md-6">
                <h2>Login</h2>

                <form className="form login-form">
                    <div className="form-group">
                        <label htmlFor="email-login">email:</label>
                        <input className="form-control" type="text" id="email-login" ref={loginEmailRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-login">password:</label>
                        <input className="form-control" type="password" id="password-login" ref={loginPasswordRef} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" onClick={handleLogin}>login</button>
                    </div>
                </form>
            </div>
            <div className="col-md-6">
                <h2>Signup</h2>

                <form className="form signup-form">
                    <div className="form-group">
                        <label htmlFor="name-signup">name:</label>
                        <input className="form-control" type="text" id="name-signup" ref={usernameRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email-signup">email:</label>
                        <input className="form-control" type="text" id="email-signup" ref={signupEmailRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-signup">password:</label>
                        <input className="form-control" type="password" id="password-signup" ref={signupPasswordRef} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" onClick={handleSignup}>signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;