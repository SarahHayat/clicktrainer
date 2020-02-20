export const ADD_SCORE = "ADD_SCORE";
export const ADD_CLICK = "ADD_CLICK";
export const SET_USER = "SET_USER";
export const ADD_CHRONO = "ADD_CHRONO";
export const GET_CLICK = "GET_CLICK";


export function addClick(click){
    return {type : ADD_CLICK, click}
}

export function addScore(score){
    return {type : ADD_SCORE, score}
}
export function setUser(user) {
    return  {type: SET_USER, user};
}
export function addChrono(chrono) {
    return  {type: ADD_CHRONO, chrono};
}
export function getClick(isClick) {
    return  {type: GET_CLICK, isClick};
}