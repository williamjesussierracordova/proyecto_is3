import { getFirebaseStorage } from "./firebase.js";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

const storage = getFirebaseStorage();

export async function uploadImage(file, user, code) {
    const storageRef = ref(storage, 'images/accounts/' + user + '/' + code);
    const uploadTask = await uploadBytes(storageRef, file);
    return uploadTask; // Retorna el resultado de la subida.
}


export async function downloadImage(user, code) {
    const storageRef = ref(storage, 'images/accounts/' + user + '/' + code );
    const url = await getDownloadURL(storageRef);
    return url;
}