import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import "./App.css"
import Game from "./components/Game";
import Chrono from "./components/Chrono";
import Score from "./components/Score";



export default class Routing extends React.Component {





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
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/">
                            <Chrono/>
                            <Score/>
                            <Game/>
                        </Route>
                        <Route path="/Score">
                            <Score/>
                        </Route>
                    </Switch>
                    <nav>
                        <ul>
                            <li>
                                <Link id="Game" to="/">Start Game</Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </Router>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }
    }
}

export default Routing


