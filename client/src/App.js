import React from 'react'
import { BookProvider } from './util/GlobalState'
import Home from "./pages/Home"
import Alert from "./components/Alert"
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import LogInOrOutButton from './components/LogInOrOutButton'
import WatchAuthenticatedUser from "./components/WatchAuthenticatedUser";

function App() {
    return (
        <BookProvider>
            <WatchAuthenticatedUser />
            <Alert />
            <Router>
                <nav className="navbar navbar-light">
                    <Link className="navbar-brand px-3" to="/">Books!</Link>
                    <LogInOrOutButton />
                </nav>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
        </BookProvider>
    )
}

export default App;