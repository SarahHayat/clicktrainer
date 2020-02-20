export const ADD_SCORE = "ADD_SCORE";
export const ADD_CLICK = "ADD_CLICK";
export const SET_USER = "SET_USER";
export const GET_CHRONO = "GET_CHRONO";
export const SET_CHRONO = "SET_CHRONO";
export const GET_CLICK = "GET_CLICK";
export const GET_FINISH = "GET_FINISH";


export function addClick(click){
    return {type : ADD_CLICK, click}
}

export function addScore(score){
    return {type : ADD_SCORE, score}
}
export function setUser(user) {
    return  {type: SET_USER, user};
}
export function getChrono(chrono) {
    return  {type: GET_CHRONO, chrono};

}export function setChrono(chrono) {
    return  {type: SET_CHRONO, chrono};
}
export function getClick(isClick) {
    return  {type: GET_CLICK, isClick};
}

export function getFinish(finish) {
    return {type: GET_FINISH, finish}
}
