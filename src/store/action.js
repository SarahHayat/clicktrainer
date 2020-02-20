export const ADD_SCORE = "ADD_SCORE";
export const ADD_CLICK = "ADD_CLICK";
export const SET_USER = "SET_USER";


export function addClick(click){
    return {type : ADD_CLICK, click}
}

export function addScore(score){
    console.log(score);
    return {type : ADD_SCORE, score}
}
export function setUser(user) {
    return  {type: SET_USER, user};
}