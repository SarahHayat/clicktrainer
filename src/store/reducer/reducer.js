const initialState = {
    click: 0,
    score: [],
    survivorScore: []
};

function reducer(state = initialState, action) {

    switch (action.type) {
        case "ADD_CLICK":
            return {...state, click: action.click};

        case "ADD_SCORE":
            return {...state, score: [...state.score, action.score]};

        case "ADD_SURVIVOR_SCORE":
            console.log({...state, survivorScore: [...state.survivorScore, action.survivorScore]});
            return {...state, survivorScore: [...state.survivorScore, action.survivorScore]};

        case "SET_USER":
            return {...state, user: action.user};

        case "GET_CHRONO":
            return {...state, chrono: action.chrono};

        case "SET_CHRONO":
            return {...state, chrono: action.chrono};

        case "GET_CLICK":
            return {...state, isClick: action.isClick};

        case "GET_GAME_MODE":
            return {...state, gameMode: action.gameMode};

        default:
            return state;
    }
}

export default reducer