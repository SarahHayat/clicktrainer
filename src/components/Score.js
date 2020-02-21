import React from "react";
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";

class Score extends React.Component {
/**
 * initialisation of a table score and survivor score
 * @param {*} props
 */

    constructor(props) {
        super(props);
        this.state = {
            score: [],
            survivorScore: [],
            insaneScore: []
        };
    }

    render() {
        return (
            <div className="scoreTables">
                <table className="normalTable" >
                    <thead>
                    <h2 id = "gamemode1"> Normal </h2>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.score.map((value, index) => <tr key={index}>
                            <td>{value.user}</td>
                            <td>{value.score}</td>
                        </tr>)
                    }
                    </tbody>
                </table>

                <table className="survivorTable">
                    <thead>
                    <h2 id = "gamemode2"> Survivor </h2>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.survivorScore.map((value, index) => <tr key={index}>
                            <td>{value.user}</td>
                            <td>{value.score}</td>
                            <td>{value.chrono}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <table className="insaneTable">
                    <thead>
                    <h2 id = "gamemode3"> Insane </h2>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.insaneScore.map((value, index) => <tr key={index}>
                            <td>{value.user}</td>
                            <td>{value.score}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
                <footer> © L.E.S.A.H, Inc </footer>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        score: state.score,
        survivorScore: state.survivorScore,
        insaneScore: state.insaneScore
    }
};

export default withRouter(connect(mapStateToProps)(Score));
