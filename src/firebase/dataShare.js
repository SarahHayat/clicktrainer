import * as firebase from "firebase";

export const PATH_NORMAL = "/normal";
export const PATH_SURVIVAL = "/survival";
let score = [];


export function setStoreScore(score, path) {
    firebase.database().ref(path).set(score).then(r => console.log(r));
}

export function getStoreScore(path) {
    firebase.database().ref(path).on('value', (snap) => {
        callBackGetStore(snap.val());
    })
    return score;
}

function callBackGetStore(snap) {
    score = snap;
}

