import React from "react";
import {connect} from "react-redux";
import {addClick} from "../store/action";
import Chrono from "./Chrono";

class Game extends React.Component {

    _area = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            posX: 100,
            posY: 100,
            score: 0
        }
    }

    _click = () => {
        console.log("browserWidth", this._area.current.clientWidth);
        console.log("browserHeight", this._area.current.clientHeight);
        let maxX = this._area.current.clientWidth * 0.9;
        let maxY = this._area.current.clientHeight * 0.85;
        this.state.score++;
        this.setState({
            ...this.state, posX: Math.floor(Math.random() * maxX),
            posY: Math.floor(Math.random() * maxY), score: this.state.score
        });
        this.props.addClick(this.state.score);
        console.log(this.state.posX);
        console.log(this.state.posY);
    };


    _buttonStyle = () => {

        return {
            borderRadius: 50 + "%",
            height: 40 + "px",
            width: 40 + "px",
            position: "absolute",
            left: this.state.posX + "px",
            bottom: this.state.posY + "px"
        }
    };

    _screenSize = () => {
        return {
            width: this._area.current.clientWidth,
            height: this._area.current.clientHeight
        }
    };

    submitHandler(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Chrono/>
                <div className="area" ref={this._area}>
                    <p> Score {this.state.score}</p>
                    <ul className="circles">
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                    </ul>
                </div>
                <button style={Object.assign(this._buttonStyle(), this._screenSize)} onClick={this._click} onKeyPress={this.submitHandler}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        score : state.score
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addClick: click => {
            dispatch(addClick(click))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

