export const ADD_SCORE = "ADD_SCORE";
export const ADD_CLICK = "ADD_CLICK";
export const GET_FINISH = "GET_FINISH";


export function addClick(click){
    return {type : ADD_CLICK, click}
}

export function addScore(score){
    return {type : ADD_SCORE, score}
}

export function getFinish(finish){
    return{type : GET_FINISH, finish}
}
