import React from "react";

export default class Game extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
         posX: 100,
         posY: 100
        }

    }

    _click = () => {
        console.log("browserWidth", window.outerWidth)
        console.log("browserHeight", window.outerHeight)

        let maxX = window.outerWidth * 0.9;
        let maxY = window.outerHeight * 0.9;

        this.setState({...this.state, posX: Math.floor(Math.random() * maxX), posY: Math.floor(Math.random() * maxY)});
        console.log(this.state.posX);
        console.log(this.state.posY);
    };

    _buttonStyle = () => {

        return {
            borderRadius: 50 + "%",
            height: 40 + "px",
            width: 40 + "px",
            background: "red",
            color: "white",
            position: "absolute",
            left: this.state.posX + "px",
            top: this.state.posY + "px"
        }
    };

    _screenSize = () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    render() {
        return (
            <div>


                <div className="area">
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <button style={Object.assign(this._buttonStyle(), this._screenSize)} onClick={this._click}></button>

            </div>
        );
    }


    }

