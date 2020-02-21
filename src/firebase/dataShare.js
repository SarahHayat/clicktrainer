import * as firebase from "firebase";

export const PATH_NORMAL = "/normal";
export const PATH_SURVIVAL = "/survival";
export const PATH_INSANE = "/insane";

let score = [];

/**
 * set the score in firebase
 * @param {*} score
 * @param {*} path
 */

export function setStoreScore(score, path) {
    firebase.database().ref(path).set(score).then(r => console.log(r));
}

/**
 * get the score in firebase
 * @param {*} score
 * @param {*} path
 */

export function getStoreScore(path) {
    firebase.database().ref(path).on('value', (snap) => {
        callBackGetStore(snap.val());
    });
    if(score != undefined) {
        return score;
    }
    return [];
}

function callBackGetStore(snap) {
    score = snap;
}

