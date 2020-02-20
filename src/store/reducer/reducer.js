const initialState = {
    click: 0,
    score: [],
    survivorScore: [],
    user: ""
};

function reducer(state = initialState, action){

    switch (action.type){
        case "ADD_CLICK":
            return {...state, click:  action.click};

        case "ADD_SCORE":
            let nextState = {...state, score: [...state.score, action.score]};
            console.log(nextState);
            if (nextState.score.length > 5) {
                nextState.score.pop()
            }
            return nextState;

        case "ADD_SURVIVOR_SCORE":
            let nextStatesurvivorScore = {...state, survivorScore: [...state.survivorScore, action.survivorScore]};
            console.log(nextStatesurvivorScore);
            if (nextStatesurvivorScore.survivorScore.length > 5) {
                nextStatesurvivorScore.survivorScore.pop()
            }
            return nextStatesurvivorScore;

            return {...state, survivorScore: [...state.survivorScore, action.survivorScore]};

        case "SET_USER":
            return {...state, user:  action.user};

        case "GET_CHRONO":
            return {...state, chrono:  action.chrono};

        case "SET_CHRONO":
            return {...state, chrono:  action.chrono};

        case "GET_CLICK":
            return {...state, isClick:  action.isClick};

        case "GET_FINISH":
            return {...state, finish: action.finish};

        case "GET_GAME_MODE":
            return {...state, gameMode: action.gameMode};

            default:
                return state;
    }
}

export default reducer
