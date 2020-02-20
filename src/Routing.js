import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import "./App.css"
import Game from "./components/Game";
import Chrono from "./components/Chrono";
import Score from "./components/Score";


class Routing extends React.Component {


    // eslint-disable-next-line no-useless-constructor
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
                                <Link  to="/">Game</Link>
                            </li>
                            <li>
                                <Link to="/Score">Score</Link>
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
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Routing


