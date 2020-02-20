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
            click: 0,
            fakePosX: 50,
            fakePosY: 50,
            score: 0,
            fakeClick: false
        }
    }

    _click = () => {
        this._fakeClick();
        let maxX = this._area.current.clientWidth * 0.9;
        let maxY = this._area.current.clientHeight * 0.85;
        let fakeMaxX = this._area.current.clientWidth * 0.9;
        let fakeMaxY = this._area.current.clientHeight * 0.85;
        this.state.score++;
        this.setState({
            ...this.state,
            posX: Math.floor(Math.random() * maxX),
            posY: Math.floor(Math.random() * maxY),
            fakePosX: Math.floor(Math.random() * fakeMaxX),
            fakePosY: Math.floor(Math.random() * fakeMaxY),
            score: this.state.score
        });
        if(this.state.fakeClick){
            this.setState({
                ...this.state,
                posX: Math.floor(Math.random() * maxX),
                posY: Math.floor(Math.random() * maxY),
                score: this.state.score
            });

        }else{

        }
        this.props.addClick(this.state.score);
            console.log(this.state.posX);
            console.log(this.state.posY);
    };

    _fakeClick = () => {
        if(this.state.fakeClick){
            this.state.fakeClick = false
        }else{
            this.state.fakeClick = true
        }
    };

    _onFakeClick = () => {
        this.state.score--;
        this.setState({
           ...this.state, score: this.state.score
        })
        this.props.addClick(this.state.score);

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
                    <p> Score {this.state.click}</p>
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
                {this.state.fakeClick ? <button id="fakeButton" style={Object.assign(this._fakeButtonStyle(), this._screenSize)} onClick={this._onFakeClick}/> : null}
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

