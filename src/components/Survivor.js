import React from "react";
import {connect} from "react-redux";
import {addClick, getClick, setGameMode, setChrono} from "../store/action";
import {GAME_MODE_SURVIVOR} from "../gameMode";
import Game from "./Game";
import {withRouter} from "react-router-dom";

class Survivor extends React.Component {

    _area = React.createRef();
/**
 * Initialisation of the button and the score
 * @param {*} props
 */
    constructor(props) {
        super(props);
        this.state = {
            posX: 100,
            posY: 100,
            click: 0,
            isClick: false
        };
        this.props.setGameMode(GAME_MODE_SURVIVOR)

    }
    /**
     * the function click is activate when we click on the button.
     * For the button, when we click, he change position and add to the timer 50 milliseconds.
     */
    _click = () => {
        let maxX = this._area.current.clientWidth * 0.9;
        let maxY = this._area.current.clientHeight * 0.85;
        this.state.click = this.props.click;
        this.state.click++;
        this.props.addClick(this.state.click)
        this.setState({
            ...this.state, posX: Math.floor(Math.random() * maxX),
            posY: Math.floor(Math.random() * maxY), click: this.state.click
        });
        this.props.addClick(this.state.click);
        this.state.isCLick = true;
        this.props.getClick(this.state.isCLick);
        this.props.setChrono(30);


    };

     /**
     * style of the button
     */

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

    /**
     * size of the area game
     */

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
                <Game/>
                <div className="area" ref={this._area}>
                    <p> Score {this.props.click}</p>
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
                <button style={Object.assign(this._buttonStyle(), this._screenSize)}
                        onClick={this._click}
                        onKeyPress={this.submitHandler}
                        disabled={this.props.finish}
                        id="cible"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        click : state.click,
        chrono: state.chrono,
        finish: state.finish
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addClick: click => {
            dispatch(addClick(click))
        },
        getClick: isClick => {
            dispatch(getClick(isClick))
        },
        setChrono: chrono => {
            dispatch(setChrono(chrono))
        },
        setGameMode: gameMode => {
            dispatch(setGameMode(gameMode))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Survivor));

