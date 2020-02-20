const initialState = {
    click: 0,
    score: [],
    survivorScore: []
};

function reducer(state = initialState, action){

    switch (action.type){
        case "ADD_CLICK": //count the click
            return {...state, click:  action.click};

        case "ADD_SCORE": //add to the table game score
            let nextState = {...state, score: [...state.score, action.score]};
            console.log(nextState);
            if (nextState.score.length > 5) { //limit of the five best scores  
                nextState.score.pop()
            }
            return nextState;

        case "ADD_SURVIVOR_SCORE": //add to the table survivor score
            let nextStatesurvivorScore = {...state, survivorScore: [...state.survivorScore, action.survivorScore]};
            console.log(nextStatesurvivorScore);
            if (nextStatesurvivorScore.survivorScore.length > 5) { //limit of the five best scores 
                nextStatesurvivorScore.survivorScore.pop()
            }
            return nextStatesurvivorScore;

            return {...state, survivorScore: [...state.survivorScore, action.survivorScore]};

        case "SET_USER": // set the user 
            return {...state, user:  action.user};

        case "GET_CHRONO": //get the time for the score
            return {...state, chrono:  action.chrono};

        case "SET_CHRONO": //set the time
            return {...state, chrono:  action.chrono};

        case "GET_CLICK"://get the click 
            return {...state, isClick:  action.isClick};

        case "GET_FINISH": //get 
            return {...state, finish: action.finish};

        case "GET_GAME_MODE": //get the mode game
            return {...state, gameMode: action.gameMode};

            default:
                return state;
    }
}

export default reducer
