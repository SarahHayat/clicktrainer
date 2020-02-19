import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import "./App.css"
import Game from "./components/Game";
import Chrono from "./components/Chrono";


export default class Routing extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }
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

                        </ul>
                    </nav>
                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path="/">
                            <Chrono/>
                            <Game/>
                        </Route>

                    </Switch>
                </div>
            </Router>
        )
    }
}


