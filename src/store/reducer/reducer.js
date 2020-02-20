const initialState = {
    click: 0,
    score: []
};

function reducer(state = initialState, action){

    switch (action.type){
        case "ADD_CLICK":
            return {...state, click:  action.click};

        case "ADD_SCORE":
            return {...state, score: [...state.score, action.score]};

        case "SET_USER":
            return {...state, user:  action.user};
            
            default:
                return state;
    }
}

export default reducer