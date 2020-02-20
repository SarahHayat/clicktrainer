export const ADD_SCORE = "ADD_SCORE";
export const ADD_CLICK = "ADD_CLICK";


export function addClick(click){
    return {type : ADD_CLICK, click}
}

export function addScore(score){
    return {type : ADD_SCORE, score}
}