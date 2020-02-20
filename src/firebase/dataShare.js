import * as firebase from "firebase";

export const PATH_NORMAL = "/normal";
export const PATH_SURVIVAL = "/survival";

export function storeScore(score, path) {
    firebase.database().ref(path).set(score).then(r => console.log(r));
}


