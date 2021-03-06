import React from "react";
import {connect} from "react-redux";
import {addClick, setGameMode} from "../store/action";
import {GAME_MODE_NORMAL} from "../gameMode";
import Game from "./Game";
import {withRouter} from "react-router-dom";

class Normal extends React.Component {

    /**
     * initialisation of the mode "normal" with the position of the button,
     * the score and the position of the fake button, hide in the beginning.
     * @param {*} props
     */

    _area = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            posX: 100,
            posY: 100,
            fakePosX: 50,
            fakePosY: 50,
            click: 0,
            fakeClick: false
        };
        this.props.setGameMode(GAME_MODE_NORMAL)
    }
      /**
     * the function click is activate when we click on one of the buttons.
     * For the two buttons, when we click, they change position.
     */

    _click = () => {
        this.state.click = this.props.click;
        this._fakeClick();
        let maxX = this._area.current.clientWidth * 0.9; //limitation of the area of the button
        let maxY = this._area.current.clientHeight * 0.85;
        let fakeMaxX = this._area.current.clientWidth * 0.9; //limitation of the area of the fake button
        let fakeMaxY = this._area.current.clientHeight * 0.85;
        this.state.click++; //add a point in score
        this.props.addClick(this.state.click)
        this.setState({
            ...this.state,
            posX: Math.floor(Math.random() * maxX), //randomize the new position of the button
            posY: Math.floor(Math.random() * maxY),
            fakePosX: Math.floor(Math.random() * fakeMaxX), //randomize the new position of the fake button
            fakePosY: Math.floor(Math.random() * fakeMaxY),
            click: this.state.click
        });
        if(this.state.fakeClick){
            this.setState({
                ...this.state,
                posX: Math.floor(Math.random() * maxX), //randomize the new position of the button
                posY: Math.floor(Math.random() * maxY),
                click: this.state.click
            });

        }else{

        }
        this.props.addClick(this.state.click); //add to the score
    };

/**
 * the function fakeClick allows to appear and disappear the fake button
 */

    _fakeClick = () => {
        if(this.state.fakeClick){
            this.state.fakeClick = false
        }else{
            this.state.fakeClick = true
        }
    };

/**
 * the function fakeClick allows to remove a points when we click on the fake button
 */

    _onFakeClick = () => {
        this.state.click = this.props.click;
        this.state.click--;
        this.setState({
           ...this.state, score: this.state.click
        })
        this.props.addClick(this.state.click);

    }


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
     * style of the fake button
     */

    _fakeButtonStyle = () => {

        return {
            borderRadius: 50 + "%",
            height: 40 + "px",
            width: 40 + "px",
            position: "absolute",
            left: this.state.fakePosX + "px",
            bottom: this.state.fakePosY + "px"

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
                {this.state.fakeClick ? <button id="fakeButton"
                                                style={Object.assign(this._fakeButtonStyle(), this._screenSize)}
                                                onClick={this._onFakeClick}
                                                onKeyPress={this.submitHandler}
                                                disabled={this.props.finish}/> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        click : state.click,
        finish: state.finish
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addClick: click => {
            dispatch(addClick(click))
        },
        setGameMode: gameMode => {
            dispatch(setGameMode(gameMode))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Normal));

