import React from "react";
import {connect} from "react-redux";
import {addChrono, addClick, addScore} from "../store/action";

class Chrono extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: 1,
            seconds: 0,
            finish: false,
            user : this.props.user

        };
        this._startChrono()
    }


    _startChrono = () => {
        console.log(this.props.isClick);
        this.myInterval = setInterval(() => {
            const {seconds, minutes} = this.state;
            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
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
                        seconds: 59
                    }))
                }
            } else if (seconds === 0 && minutes === 0) {
                this.props.addScore(
                    {
                        user: this.state.user,
                        score: this.props.click
                    });
                console.log(this.props.click);
                this.props.addScore(this.props.click);
                clearInterval(this.myInterval);
                this.props.addClick(0);
            } else if (this.props.isClick){

                this.setState(({seconds}) => ({
                    seconds: seconds + 5,

                }))
                this.props.isClik = false
            }
        }, 1000)

    };


    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const {minutes, seconds} = this.state

        return (
            <div>
                {minutes === 0 && seconds === 0
                    ? <h1>GAME OVER !</h1>
                    : <h1>Time Remaining: <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span></h1>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        click: state.click,
        user: state.user,
        chrono: state.seconds,
        isClick: state.isClick
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addScore: score => {
            dispatch(addScore(score))
        },

        addClick: click => {
            dispatch(addClick(click))
        },

        addChrono: chrono => {
            dispatch(addChrono(chrono))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chrono)
