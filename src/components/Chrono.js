import React from "react";
import {connect} from "react-redux";
import {addScore, getFinish} from "../store/action";

class Chrono extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: 1,
            seconds: 0,
            finish: false,
        };
        this._startChrono()
    }

    _startChrono = () => {

        this.myInterval = setInterval(() => {
            const {seconds, minutes} = this.state;
            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.props.addScore(this.props.score);
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({minutes}) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } else if (seconds === 55 && minutes === 0) {
                console.log(this.props.click);
                this.props.addScore(this.props.click);
                clearInterval(this.myInterval);
                this.state.finish = true;
                this.props.getFinish(this.state.finish);
                this.props.addClick(0);
                this._startChrono();
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
        click : state.click
    }
};

const mapDispatchToProps = dispatch => {
    return {

        getFinish: finish => {
            dispatch(getFinish((finish)))
        },

        addScore: score => {
            dispatch(addScore(score))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chrono)
