import React from "react";
import {connect} from 'react-redux'

class Score extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.score)
    }

    render(){
        return(
            <table>
            <thead><tr><th>Score</th></tr></thead><tbody>
                    {
                       this.props.score.map((value, index) => <tr key={index}><td>{value}</td></tr>)
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