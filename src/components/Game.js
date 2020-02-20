import React from "react";
import {connect} from "react-redux";
import {addClick, getGameMode} from "../store/action";
import Chrono from "./Chrono";
import {GAME_MODE_NORMAL} from "../gameMode";

class Game extends React.Component {

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
        this.props.getGameMode(GAME_MODE_NORMAL)
    }

    _click = () => {
        this.state.click = this.props.click;
        this._fakeClick();
        let maxX = this._area.current.clientWidth * 0.9;
        let maxY = this._area.current.clientHeight * 0.85;
        let fakeMaxX = this._area.current.clientWidth * 0.9;
        let fakeMaxY = this._area.current.clientHeight * 0.85;
        this.state.click++;
        this.props.addClick(this.state.click)
        this.setState({
            ...this.state,
            posX: Math.floor(Math.random() * maxX),
            posY: Math.floor(Math.random() * maxY),
            fakePosX: Math.floor(Math.random() * fakeMaxX),
            fakePosY: Math.floor(Math.random() * fakeMaxY),
            click: this.state.click
        });
        if(this.state.fakeClick){
            this.setState({
                ...this.state,
                posX: Math.floor(Math.random() * maxX),
                posY: Math.floor(Math.random() * maxY),
                click: this.state.click
            });

        }else{

        }
        this.props.addClick(this.state.click);
    };

    _fakeClick = () => {
        if(this.state.fakeClick){
            this.state.fakeClick = false
        }else{
            this.state.fakeClick = true
        }
    };

    _onFakeClick = () => {
        this.state.click--;
        this.setState({
           ...this.state, score: this.state.click
        })
        this.props.addClick(this.state.click);

    }



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
                <button style={Object.assign(this._buttonStyle(), this._screenSize)} onClick={this._click} onKeyPress={this.submitHandler} disabled={this.props.finish} id="cible"/>
                {this.state.fakeClick ? <button id="fakeButton" style={Object.assign(this._fakeButtonStyle(), this._screenSize)} onClick={this._onFakeClick} onKeyPress={this.submitHandler} disabled={this.props.finish}/> : null}
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
        getGameMode: gameMode => {
            dispatch(getGameMode(gameMode))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

