const initialState = {
    click: 0,
    score: [],
    survivorScore: [],
    insaneScore: [],
    user: "",
    firstTime: false
};

function reducer(state = initialState, action){

    switch (action.type){
        case "ADD_CLICK": //count the click
            return {...state, click:  action.click};

        case "ADD_SCORE": //add to the table game score
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
            while (nextState.score.length > 5) {//limit of the five best scores
                nextState.score.pop()
            }
            return nextState;

        case "ADD_INSANE_SCORE": //add the insane score
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
            while (nextStateInsaneScore.insaneScore.length > 5) {//add to the table survivor score
                nextStateInsaneScore.insaneScore.pop()
            }
            return nextStateInsaneScore;

        case "ADD_SURVIVOR_SCORE": //add survivor score
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
            while (nextStateSurvivorScore.survivorScore.length > 5) {
                nextStateSurvivorScore.survivorScore.pop()
            }
            return nextStateSurvivorScore;


        case "SET_USER": // set the user
            return {...state, user:  action.user};

        case "GET_CHRONO": //get the time for the score
            return {...state, chrono:  action.chrono};

        case "SET_CHRONO": //set the time
            return {...state, chrono:  action.chrono};

        case "GET_CLICK"://get the click
            return {...state, isClick:  action.isClick};

        case "GET_FINISH"://returen the state of time
            return {...state, finish: action.finish};

        case "SET_GAME_MODE"://get the mode game
            return {...state, gameMode: action.gameMode};

        case "SET_FIRST_TIME"://Set boolean for the first openning app
            return {...state, firstTime: action.firstTime};

            default:
                return state;
    }
}

export default reducer
