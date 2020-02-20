import React from "react";
import {connect} from 'react-redux'

class Score extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: [],
            survivorScore: [],
        };
    }

    render() {
        return (
            <div>
                <table>
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
                <table>

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
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        score: state.score,
        survivorScore: state.survivorScore
    }
};

export default connect(mapStateToProps)(Score);