import React from "react";

export default class Game extends React.Component{





    constructor(props) {
        super(props);
        this.state = {
         posX: 100,
         posY: 100,
         score: 0
        }

    }


    _click = () => {
        this.setState({...this.state, posX: Math.floor(Math.random() * 1000), posY: Math.floor(Math.random() * 1000)});
        console.log(this.state.posX);
        console.log(this.state.posY);
        this.score++;
    };

    //quand la partie est finie, envoyer le score dans le store pour qu'il l'ajoute à la liste des scores 
    _buttonStyle = () => {

        return {
            borderRadius: 50 + "%",
            height: 40 + "px",
            width: 40 + "px",
            /*background: "red",
            color: "white",*/
            position: "absolute",
            left: this.state.posX + "px",
            top: this.state.posY + "px"
        }
    };

    render() {
        return(
            <div >
                <div className="area">
                    <ul className="circles">
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                    </ul>
                </div>
                <button className="gameScreen" style={this._buttonStyle()} onClick={this._click}> </button>

            </div>



        );
    }



    }

