export const ADD_SCORE = "ADD_SCORE";
export const ADD_SURVIVOR_SCORE = "ADD_SURVIVOR_SCORE";
export const ADD_INSANE_SCORE = "ADD_INSANE_SCORE";
export const ADD_CLICK = "ADD_CLICK";
export const SET_USER = "SET_USER";
export const GET_CHRONO = "GET_CHRONO";
export const SET_CHRONO = "SET_CHRONO";
export const GET_CLICK = "GET_CLICK";
export const GET_FINISH = "GET_FINISH";
export const SET_GAME_MODE = "SET_GAME_MODE";


export function addClick(click){
    return {type : ADD_CLICK, click}
}
export function addScore(score){
    return {type : ADD_SCORE, score}
}
export function addSurvivorScore(survivorScore){
    return {type : ADD_SURVIVOR_SCORE, survivorScore}
}
export function addInsaneScore(insaneScore) {
    return {type: ADD_INSANE_SCORE, insaneScore}
}
export function setUser(user) {
    return  {type: SET_USER, user};
}
export function setChrono(chrono) {
    return  {type: SET_CHRONO, chrono};
}
export function getClick(isClick) {
    return  {type: GET_CLICK, isClick};
}
export function setGameMode(gameMode) {
    return  {type: SET_GAME_MODE, gameMode};
}
export function getFinish(finish) {
    return {type: GET_FINISH, finish}
}
