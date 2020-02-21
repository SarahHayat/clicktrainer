import React from "react";
import {connect} from "react-redux";
import {addClick, getClick, setGameMode, setChrono} from "../store/action";
import Game from "./Game";
import {GAME_MODE_INSANE} from "../gameMode";
import {withRouter} from "react-router-dom";

class Insane extends React.Component {

    _area = React.createRef();
    maxX = 100;
    maxY = 100;
    tabButton = [];
    multiplyButton = 1;
    posxRandom = 200;
    posyRandom = 200;

    constructor(props) {
        super(props);
        this.state = {
            posX: 100,
            posY: 100,
            click: 0,
            isClick: false
        };
        this.props.setGameMode(GAME_MODE_INSANE);
        this._multiplyButton();
    }

    _click = (e) => {

        e.preventDefault();
        this._randomPos();
        this.tabButton.splice(e.target.getAttribute("data-key"),1, null);
        if(this.tabButton.every(el => el === null)){
            this._multiplyButton();
        }
        this.state.click = this.props.click;
        this.state.click ++;
        this.props.addClick(this.state.click)
        this.state.isCLick = true;
        this.props.getClick(this.state.isCLick);
    };


    _randomPos = () => {
        this.maxX = this._area.current.clientWidth * 0.9;
        this.maxY = this._area.current.clientHeight * 0.85;
        this.posxRandom = Math.floor(Math.random() * this.maxX);
        this.posyRandom = Math.floor(Math.random() * this.maxY);
    }

    _buttonStyle = () => {
        return {
            borderRadius: 50 + "%",
            height: 40 + "px",
            width: 40 + "px",
            position: "absolute",
            left: this.posxRandom + "px",
            bottom: this.posyRandom + "px"
        }
    };

    _screenSize = () => {
        return {
            width: this._area.current.clientWidth,
            height: this._area.current.clientHeight
        }
    };

    _reset = ()  => {
        this.tabButton = [];
        this.multiplyButton = 1;
        this.tabButton.push(<button style={Object.assign(this._buttonStyle(), this._screenSize)}
                                    onClick={e => this._click(e)}
                                    onKeyPress={this.submitHandler}
                                    id="cible"
                                    key={this.tabButton.length}
                                    data-key={this.tabButton.length}/>);

    };


    _multiplyButton = () => {
        for (let i = 0; i < this.multiplyButton; i++) {
            if (this.multiplyButton !== 1) {
                this._randomPos();
            }
            this.tabButton.push(<button style={Object.assign(this._buttonStyle(), this._screenSize)}
                                        onClick={e => this._click(e)}
                                        onKeyPress={this.submitHandler}
                                        disabled={this.props.finish}
                                        id="cible"
                                        key={this.tabButton.length}
                                        data-key={this.tabButton.length}/>);
        }
        this.multiplyButton = this.multiplyButton * 2;
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
                {this.props.finish ? this._reset() : null}
                {this.props.finish ? null : this.tabButton.map((el) => el)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Insane));

