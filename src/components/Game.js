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
            fakePosX: 50,
            fakePosY: 50,
            score: 0,
            fakeClick: true
        }
    }

    _click = () => {
        console.log("browserWidth", this._area.current.clientWidth);
        console.log("browserHeight", this._area.current.clientHeight);
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
        if(this._fakeClick()){
            this.setState({
                ...this.state, 
                fakePosX: Math.floor(Math.random() * fakeMaxX),
                fakePosY: Math.floor(Math.random() * fakeMaxY),
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
        return this.state.fakeClick != this.state.fakeClick

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
                <button id="button" style={Object.assign(this._buttonStyle(), this._screenSize)} onClick={this._click}/>
                <button id="fakeButton" style={Object.assign(this._fakeButtonStyle(), this._screenSize)} onClick={this._onFakeClick}/> 
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

