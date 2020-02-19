const initialState = {
    score : []
};

function reducer(state = initialState, action){

    switch (action.type){
        case "ADD_SCORE":
            return {...state, score: [...state.score, action.score]};
            
            default:
                return state;
    }

}

export default reducer