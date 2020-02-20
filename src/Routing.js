import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import "./App.css"
import Game from "./components/Game";
import Survivor from "./components/Survivor";
import Score from "./components/Score";
import Users from "./components/Users";
import About from "./components/About";


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
                                <Link to="/Survivor">Survivor</Link>
                            </li>
                            <li>
                                <Link to="/Score">Score</Link>
                            </li>
                            <li>
                                <Link to="/Users">Users</Link>
                            </li><li>
                            <Link to="/About">About</Link>
                        </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/">
                            <Game/>
                        </Route>
                        <Route path="/Survivor">
                            <Survivor/>
                        </Route>
                        <Route path="/Score">
                            <Score/>
                        </Route>
                        <Route path="/Users">
                            <Users/>
                        </Route><Route path="/About">
                            <About/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Routing


