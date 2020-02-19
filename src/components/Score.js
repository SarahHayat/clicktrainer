import React from "react";
import { withRouter } from "react-router-dom";
//import {connect} from 'react-redux'

export default class Score extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <table>
            <thead><tr><th>Score</th></tr></thead><tbody>
                    {
                       this.props.score.map((value, index) => <tr key={index}><td>{value.score}</td></tr>)
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
}

export default withRouter(connect(mapStateToProps))(Score);