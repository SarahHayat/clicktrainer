import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import "./App.css"
import Game from "./components/Game";
import Chrono from "./components/Chrono";
import Score from "./components/Score";
import Users from "./components/Users";


class Routing extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Game</Link>
                            </li>
                            <li>
                                <Link to="/Score">Score</Link>
                            </li>
                            <li>
                                <Link to="/Users">Users</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/">
                            <Game/>
                        </Route>
                        <Route path="/Score">
                            <Score/>
                        </Route>
                        <Route path="/Users">
                            <Users/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Routing


