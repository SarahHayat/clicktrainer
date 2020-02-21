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
                <footer> © L.E.S.A.H, Inc </footer>
                <table className="normalTable" >
                    <thead>
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
