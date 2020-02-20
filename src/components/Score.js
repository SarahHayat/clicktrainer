import React from "react";
import {connect} from 'react-redux'

class Score extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: []
        }

    }

    render(){
        return(
            <table>
            <thead><tr><th>Name</th><th>Score</th></tr></thead><tbody>
                    {
                       this.props.score.map((value, index) => <tr key={index}><td>{value.user}</td><td>{value.score}</td></tr>)
                    }
        </tbody>
        </table>
    )
}
}

const mapStateToProps = (state) => {
    return {
        score : state.score
    }
};

export default connect(mapStateToProps)(Score);