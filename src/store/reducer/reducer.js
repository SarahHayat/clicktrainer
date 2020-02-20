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
            nextState.score.sort((a, b) => {
                if(a.score > b.score) {
                    return -1;
                }
                if(a.score < b.score) {
                    return 1;
                }
                return 0;
            });
            if (nextState.score.length > 5) {
                nextState.score.pop()
            }
            return nextState;

        case "ADD_SURVIVOR_SCORE":
            let nextStateSurvivorScore = {...state, survivorScore: [...state.survivorScore, action.survivorScore]};
            console.log(nextStateSurvivorScore);
            nextStateSurvivorScore.survivorScore.sort((a, b) => {
                if(a.score > b.score) {
                    return -1;
                }
                if(a.score < b.score) {
                    return 1;
                }
                return 0;
            });
            if (nextStateSurvivorScore.survivorScore.length > 5) {
                nextStateSurvivorScore.survivorScore.pop()
            }
            return nextStateSurvivorScore;

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
