import React from "react";
import {setUser} from "../store/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Users extends React.Component{
    /**
     * Initialisation of a text input to write an user name
     * @param {*} props
     */

    constructor(props) {
        super(props);
        this.state = {
            user : ""
        }
    }
    /**
     *
     * @param {*} event
     */

    setUser(event) {
        event.preventDefault();
        this.props.setUser( event.target[0].value);
    }
    render() {
        return (
            <form onSubmit={ event => this.setUser(event) }>
                <footer> © L.E.S.A.H, Inc </footer>
                <label>
                    Prénom:
                    <input type="text"  name="Prénom"/>
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        )
    }
}
const mapSateToProps = state => {
    return {
        user : state.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setUser: user => {
            dispatch(setUser(user))
        }
    }
};
export default withRouter(connect(
    mapSateToProps,
    mapDispatchToProps
)(Users))