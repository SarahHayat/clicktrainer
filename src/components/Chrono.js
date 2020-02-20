import React from "react";
import {connect} from "react-redux";
import {addClick, addScore, setChrono, getFinish} from "../store/action";

class Chrono extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            minutes: 1,
            seconds: 0,
            milliseconds: 0,
            finish: false,
            user: this.props.user,
        };
        this.state.finish = true;
        this.props.getFinish(this.state.finish);
    }

    _reset = () => {
        clearInterval(this.myInterval);
        this.setState({...this.state, minutes: 1, seconds: 0, milliseconds:0});
        this.state.finish = true;
        this.props.getFinish(this.state.finish);
    };

    _start = () => {
        this.state.finish = false;
        this.props.getFinish(this.state.finish);
        this.props.addClick(0);
        this._startChrono()
    }

    _startChrono = () => {
        this.setState({...this.state, minutes: 1, seconds: 0});
        this.myInterval = setInterval(() => {
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
                            this.props.addScore(
                                {
                                    user: this.state.user,
                                    score: this.props.click
                                });
                            clearInterval(this.myInterval)
                        } else {
                            this.setState(({minutes}) => ({
                                minutes: minutes - 1,
                                seconds: 59,
                                milliseconds: 100
                            }))
                        }
                    }
                } else if (seconds === 0 && minutes === 0) {
                    this.props.addScore(
                        {
                            user: this.state.user,
                            score: this.props.click
                        });
                    this.setState({
                        milliseconds: 0
                    });
                    console.log(this.props.click);
                    this.props.addScore(this.props.click);
                    clearInterval(this.myInterval);
                    this.props.addClick(0);
                    this.state.finish = true;
                    this.props.getFinish(this.state.finish);
                }
            }
            ,
            10
        )
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
                <div>
                    {this.state.finish ? null : <button onClick={this._reset} className = "bRestart" onKeyPress={this.submitHandler}>Reset</button>}
                    {this.state.finish ? <button onClick={this._start} className = "bRestart" onKeyPress={this.submitHandler}>Start</button> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        click: state.click,
        user: state.user,
        chrono: state.chrono
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

        addClick: click => {
            dispatch(addClick(click))
        },
        setChrono: chrono => {
            dispatch(setChrono(chrono))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chrono)
