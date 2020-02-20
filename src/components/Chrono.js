import React from "react";
import {connect} from "react-redux";
import {addClick, addScore, setChrono, getFinish, addSurvivorScore} from "../store/action";
import {GAME_MODE_NORMAL, GAME_MODE_SURVIVOR} from "../gameMode";

class Chrono extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            minutes: 1,
            seconds: 0,
            milliseconds: 0,
            finish: false,
            user: this.props.user,
            start: true
        };
        this.state.finish = true;
        this.props.getFinish(this.state.finish);
    }

    _reset = () => {
        this.state.start = true;
        clearInterval(this.myInterval);
        this.setState({...this.state, minutes: 1, seconds: 0, milliseconds:0});
        this.state.finish = true;
        this.props.getFinish(this.state.finish);
        this.props.addClick(0);
    };

    _start = () => {
        this.state.start = false;
        this.state.finish = false;
        this.props.getFinish(this.state.finish);
        this._startChrono()
    }

    _startChrono = () => {
        this.setState({...this.state, minutes: 1, seconds: 0});
        this.chrono = setInterval(() => {
                const {milliseconds, seconds, minutes} = this.state;
                if (this.props.chrono !== undefined) {
                    this.setState(({milliseconds}) => ({milliseconds: milliseconds + this.props.chrono}));
                    this.props.setChrono(0)
                }

                if (milliseconds > 100) {
                    this.setState(({seconds, milliseconds}) => ({
                        milliseconds: milliseconds - 100,
                        seconds: seconds + 1

                    }))
                }

                if (milliseconds > 0) {
                    this.setState(({milliseconds}) => ({
                        milliseconds: milliseconds - 1
                    }))
                }

                if (milliseconds === 0) {
                    this.setState(({seconds}) => ({
                        seconds: seconds - 1,
                        milliseconds: 100
                    }))
                }
                if (milliseconds === 0) {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(this.chrono)
                        } else {
                            this.setState(({minutes}) => ({
                                minutes: minutes - 1,
                                seconds: 59,
                                milliseconds: 100
                            }))
                        }
                    }
                } else if (seconds === 0 && minutes === 0) {
                    this._saveScore();
                    this.setState({
                        milliseconds: 0
                    });
                    this.props.addScore(this.props.click);
                    clearInterval(this.chrono);
                    this.state.finish = true;
                    this.props.getFinish(this.state.finish);
                }
            }
            ,
            10
        )
    };

    _chronoSurvivor = () => {
        this.chronoSurvivor = setInterval(() => {
                const {milliseconds, seconds, minutes} = this.state;

                if (milliseconds > 0) {
                    this.setState(({milliseconds}) => ({
                        milliseconds: milliseconds + 1
                    }))
                }

                if (milliseconds === 99) {
                    this.setState(({seconds}) => ({
                        seconds: seconds + 1,
                        milliseconds: 0
                    }))
                }
                if (milliseconds === 0) {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(this.chronoSurvivor)
                        } else {
                            this.setState(({minutes}) => ({
                                minutes: minutes - 1,
                                seconds: 59,
                                milliseconds: 1000
                            }))
                        }
                    }
                } else if (seconds === 55 && minutes === 0) {
                    clearInterval(this.chronoSurvivor);
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
        clearInterval(this.chrono)
    }

    render() {
        const {milliseconds, seconds} = this.state;

        return (
            <div>
                {seconds === 0 && milliseconds === 0
                    ? <h1>Clicker Training</h1>
                    :
                    <h1>Time Remaining: <span>{seconds < 10 ? `0${seconds}` : seconds}:{milliseconds}</span>
                    </h1>
                }
                <div>
                    {this.state.start ? null : <button onClick={this._reset} className = "bRestart" onKeyPress={this.submitHandler}>Reset</button>}
                    {this.state.start ? <button onClick={this._start} className = "bRestart" onKeyPress={this.submitHandler}>Start</button> : null}
                </div>
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
        getFinish: finish => {
            dispatch(getFinish((finish)))
        },
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
