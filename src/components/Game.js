import React from "react";
import {connect} from "react-redux";
import {
    addClick,
    addScore,
    setChrono,
    getFinish,
    addSurvivorScore,
    addInsaneScore,
    setFirstTime
} from "../store/action";
import {GAME_MODE_INSANE, GAME_MODE_NORMAL, GAME_MODE_SURVIVOR} from "../gameMode";
import {getStoreScore, PATH_INSANE, PATH_NORMAL, PATH_SURVIVAL, setStoreScore} from "../firebase/dataShare";
import {withRouter} from "react-router-dom";

class Game extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            minutes: 1,
            seconds: 0,
            milliseconds: 0,
            minutesSurvivor: 0,
            secondsSurvivor: 0,
            millisecondsSurvivor: 0,
            finish: false,
            user: this.props.user,
            start: true,
        };
        this.state.finish = true;
        this.props.getFinish(this.state.finish);

        if(this.props.score.length === 0 &&
            this.props.insaneScore.length === 0 &&
            this.props.survivorScore.length === 0) {
            getStoreScore(PATH_NORMAL).map(el => {
                this.props.addScore(el)
            });
            getStoreScore(PATH_SURVIVAL).map(el => {
                this.props.addSurvivorScore(el)
            });
            getStoreScore(PATH_INSANE).map(el => {
                this.props.addInsaneScore(el)
            });
        }
        console.log(this.props.score)
        this.props.addClick(0);
    }

    _reset = () => {
        this.state.start = true;
        clearInterval(this.chrono);
        clearInterval(this.chronoSurvivor);
        this.setState({...this.state, minutes: 1, seconds: 0, milliseconds: 0});
        this.state.finish = true;
        this.props.getFinish(this.state.finish);
        this.props.addClick(0);
    };

    _start = () => {
        this.state.start = false;
        this.state.finish = false;
        this.props.getFinish(this.state.finish);
        this._startChrono();
        if (this.props.gameMode === GAME_MODE_SURVIVOR) {
            this._chronoSurvivor();
        }
    }

    _startChrono = () => {
        this.setState({...this.state, minutes: 1, seconds: 0});
        this.chrono = setInterval(() => {
                const {milliseconds, seconds, minutes} = this.state;
                if (this.props.chrono !== undefined && this.props.gameMode === GAME_MODE_SURVIVOR) {
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
                } else if (seconds === 0) {
                    this.setState({
                        milliseconds: 0
                    });
                    clearInterval(this.chrono);
                    this.state.finish = true;
                    this.props.getFinish(this.state.finish);
                    this._saveScore();
                }
            }
            , 10
        )
    };

    _chronoSurvivor = () => {
        this.setState({...this.state, minutesSurvivor: 0, secondsSurvivor: 0, millisecondsSurvivor: 0});
        this.chronoSurvivor = setInterval(() => {
            const {secondsSurvivor, minutesSurvivor, millisecondsSurvivor} = this.state;
            if (millisecondsSurvivor >= 0) {
                this.setState(({millisecondsSurvivor}) => ({
                    millisecondsSurvivor: millisecondsSurvivor + 1
                }))
            }
            if (millisecondsSurvivor === 99) {
                this.setState(({secondsSurvivor}) => ({
                    secondsSurvivor: secondsSurvivor + 1,
                    millisecondsSurvivor: 0
                }))
            }
            if (secondsSurvivor === 59) {
                this.setState(({minutesSurvivor}) => ({
                    minutesSurvivor: minutesSurvivor + 1,
                    secondsSurvivor: 0
                }))
            }
            if (this.state.finish) {
                clearInterval(this.chronoSurvivor);
            }
        }, 10)
    };

    _saveScore = () => {
        if (this.props.gameMode === GAME_MODE_NORMAL) {
            let score = {
                user: this.state.user,
                score: this.props.click
            }
            this.props.addScore(score);
            setStoreScore(this.props.score, PATH_NORMAL);
        } else if (this.props.gameMode === GAME_MODE_SURVIVOR) {
            let score = {
                user: this.state.user,
                score: this.props.click,
                chrono: (this.state.minutesSurvivor < 10 ? `0${this.state.minutesSurvivor}` : this.state.minutesSurvivor) + ":" +
                    (this.state.secondsSurvivor < 10 ? `0${this.state.secondsSurvivor}` : this.state.secondsSurvivor) + ":" +
                    (this.state.millisecondsSurvivor < 10 ? `0${this.state.millisecondsSurvivor}` : this.state.millisecondsSurvivor)
            };
            this.props.addSurvivorScore(score);
            setStoreScore(this.props.survivorScore, PATH_SURVIVAL);
        } else if (this.props.gameMode === GAME_MODE_INSANE) {
            let score = {
                user: this.state.user,
                score: this.props.click
            }
            this.props.addInsaneScore(score);
            setStoreScore(this.props.insaneScore, PATH_INSANE);
        }
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
                    <h1>Time Remaining: <span>{seconds < 10 ? `0${seconds}` : seconds}:{milliseconds < 10 ? `0${milliseconds}` : milliseconds} </span>
                    </h1>

                }
                <div>
                    {this.state.start ? null : <button onClick={this._reset} className="bRestart"
                                                       onKeyPress={this.submitHandler}>Reset</button>}
                    {this.state.start ? <button onClick={this._start} className="bRestart"
                                                onKeyPress={this.submitHandler}>Start</button> : null}
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
        gameMode: state.gameMode,
        survivorScore: state.survivorScore,
        score: state.score,
        insaneScore: state.insaneScore,
        firstTime: state.firstTime
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
        addInsaneScore: insaneScore => {
            dispatch(addInsaneScore(insaneScore))
        },
        addClick: click => {
            dispatch(addClick(click))
        },
        setChrono: chrono => {
            dispatch(setChrono(chrono))
        },
        setFirstTime: firsTime => {
            dispatch(setFirstTime(firsTime))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game))

