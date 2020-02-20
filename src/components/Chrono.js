import React from "react";
import {connect} from "react-redux";
import {addClick, addScore, addSurvivorScore, setChrono} from "../store/action";
import Survivor from "./Survivor";
import {GAME_MODE_NORMAL, GAME_MODE_SURVIVOR} from "../gameMode";

class Chrono extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: 1,
            seconds: 0,
            milliseconds: 0,
            finish: false,
            user: this.props.user

        };
        this._startChrono()
    }


    _startChrono = () => {
        this.myInterval = setInterval(() => {
                const {milliseconds, seconds, minutes} = this.state;
                if (this.props.chrono !== undefined) {
                    this.setState(({milliseconds}) => ({milliseconds: milliseconds + this.props.chrono}));
                    this.props.setChrono(0)
                }

                if (milliseconds > 1000) {
                    this.setState(({seconds, milliseconds}) => ({
                        milliseconds: milliseconds - 1000,
                        seconds: seconds + 1

                    }))
                }

                if (milliseconds > 0) {
                    this.setState(({milliseconds}) => ({
                        milliseconds: milliseconds - 10
                    }))
                }

                if (milliseconds === 0) {
                    this.setState(({seconds}) => ({
                        seconds: seconds - 1,
                        milliseconds: 1000
                    }))
                }
                if (milliseconds === 0) {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(this.myInterval)
                        } else {
                            this.setState(({minutes}) => ({
                                minutes: minutes - 1,
                                seconds: 59,
                                milliseconds: 1000
                            }))
                        }
                    }
                } else if (seconds === 55 && minutes === 0) {
                    this._saveScore();
                    this.setState({
                        milliseconds: 0,
                        seconds: 0
                    });
                    // this.props.setChrono({
                    //     milliseconds: this.props.milliseconds
                    // });
                    console.log(this.props.click);
                    this.props.addScore(this.props.click);
                    console.log("log");
                    clearInterval(this.myInterval);
                    this.props.addClick(0);

                }
            }
            ,
            10
        )
    };

    _saveScore = () => {
        if (this.props.gameMode === GAME_MODE_NORMAL) {
            this.props.addScore(
                {
                    user: this.state.user,
                    score: this.props.click
                });
        } else if (this.props.gameMode === GAME_MODE_SURVIVOR) {
            this.props.addSurvivorScore(
                {
                    user: this.state.user,
                    score: this.props.click,
                    chrono: this.state.minutes + ":" + this.state.seconds + ":" + this.state.milliseconds
                });
        }
        ;
    };

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const {milliseconds, seconds} = this.state;

        return (
            <div>
                {seconds === 0 && milliseconds === 0
                    ? <h1>GAME OVER !</h1>
                    :
                    <h1>Time Remaining: <span>{seconds < 10 ? `0${seconds}` : seconds}:{milliseconds}</span>
                    </h1>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        click: state.click,
        user: state.user,
        chrono: state.chrono,
        gameMode: state.gameMode
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addScore: score => {
            dispatch(addScore(score))
        },
        addSurvivorScore: survivorScore => {
            dispatch(addSurvivorScore(survivorScore))
        },

        addClick: click => {
            dispatch(addClick(click))
        },
        setChrono: chrono => {
            dispatch(setChrono(chrono))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chrono)
