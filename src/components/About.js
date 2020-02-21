import React from "react";
export default class About extends React.Component{
    constructor(props) {
        super(props);
        this.state = {nameTab: ["Sarah Hayat", "Antony Correia", "Lucas Provost", "Eddy Marquand", "Houssam Laghzil"]}
    }
    render() {
        return (
            <div>
                <footer> © L.E.S.A.H, Inc </footer>
                <h3> Team Member </h3>
                {
                    this.state.nameTab.map(i => <option value={i} key={i} > {i} </option>)
                }
            </div>
        )
    }
}