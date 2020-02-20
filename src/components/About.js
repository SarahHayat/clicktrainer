import React from "react";
export default class About extends React.Component{
    constructor(props) {
        super(props);
        this.state = {nameTab: ["Sarah ", "Antony ", "Lucas ", "Eddy ", "Houssam "]}
    }
    render() {
        return (
            <div>
                {
                    this.state.nameTab.map(i => <option value={i} key={i} > {i} </option>)
                }
            </div>
        )
    }
}