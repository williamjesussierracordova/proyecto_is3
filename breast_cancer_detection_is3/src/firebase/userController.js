import { getFirebaseDb } from "./firebase.js";
import { set, ref, onValue ,get} from "firebase/database";

const db = getFirebaseDb();

export function writeUser(medicalCode, email, password, name, firstLastName, secondLastName, phoneNumber) {
    set(ref(db, 'users/' + medicalCode), {
        medicalCode: medicalCode,        
        email: email,
        password: password,
        phone: phoneNumber,
        name: name,
        firstLastName: firstLastName,
        secondLastName: secondLastName
    });
}

export async function readUser(medicalCode) {
    const userRFC = ref(db, 'users/' + medicalCode);
    try {
        const snapshot = await get(userRFC);
        let data = snapshot.val();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function readUserFromEmail(email) {
    const usersRef = ref(db, 'users/');
    try {
        const snapshot = await get(usersRef);
        const usersData = snapshot.val();
        const user = Object.values(usersData).find(user => user.email === email);
        return user ? user : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function updateUserPhone(medicalCode,phone){
    onValue(ref(db, 'users/' + medicalCode), (snapshot) => {
        const data = snapshot.val();
        set(ref(db, 'users/' + medicalCode), {
            medicalCode: data.medicalCode,
            email: data.email,
            password: data.password,
            phone: phone,
            name: data.name,
            firstLastName: data.firstLastName,
            secondLastName: data.secondLastName
        });
    });
}


export function updateUserPassword(medicalCode,password){
    onValue(ref(db, 'users/' + medicalCode), (snapshot) => {
        const data = snapshot.val();
        set(ref(db, 'users/' + medicalCode), {
            email: data.email,
            password: password,
            phone: data.phone,
            name: data.name,
            firstLastName: data.firstLastName,
            secondLastName: data.secondLastName
        });
    });
}


export function deleteUser(medicalCode) {
    set(ref(db, 'users/' + medicalCode), null);
}

// writeUser('12345678','williamjsc@hotmail.com','Prueba_12@','William','Sierra','Cordova',922860927)
// writeUser('09876543','asda@gmail.com','Prueba_12@','William','Sierra','Cordova',922860927)
// deleteUser('09876543')
// console.log(await readUser('72074565'));