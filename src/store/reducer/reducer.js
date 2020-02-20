const initialState = {
    click: 0,
    score: []
};

function reducer(state = initialState, action){

    switch (action.type){

        case "GET_FINISH":
            return {...state, finish: action.finish};

        case "ADD_CLICK":
            return {...state, click:  action.click};

        case "ADD_SCORE":
            console.log({...state, score: [...state.score, action.score]});
            return {...state, score: [...state.score, action.score]};

            default:
                return state;
    }
}

export default reducer
