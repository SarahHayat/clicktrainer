const initialState = {
    click: 0,
    score: [],
    survivorScore: [],
    insaneScore: [],
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

        case "ADD_INSANE_SCORE":
            let nextStateInsaneScore = {...state, insaneScore: [...state.insaneScore, action.insaneScore]};
            nextStateInsaneScore.insaneScore.sort((a, b) => {
                if(a.score > b.score) {
                    return -1;
                }
                if(a.score < b.score) {
                    return 1;
                }
                return 0;
            });
            if (nextStateInsaneScore.score.length > 5) {
                nextStateInsaneScore.score.pop()
            }
            return nextStateInsaneScore;

        case "ADD_SURVIVOR_SCORE":
            let nextStateSurvivorScore = {...state, survivorScore: [...state.survivorScore, action.survivorScore]};
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

        case "SET_GAME_MODE":
            return {...state, gameMode: action.gameMode};

            default:
                return state;
    }
}

export default reducer
