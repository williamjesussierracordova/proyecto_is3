import { getFirebaseDb } from "./firebase.js";
import { set, ref ,get} from "firebase/database";

const db = getFirebaseDb();

export function writePatient(patientID, firstName, secondName, firstLastName, secondLastName, age, gender, phone, email) {
    set(ref(db, 'patients/' + patientID), {
        patientID: patientID,
        firstName: firstName,
        secondName: secondName,
        firstLastName: firstLastName,
        secondLastName: secondLastName,
        age: age,
        gender: gender,
        phone: phone,
        email: email
    });
}

export async function readPatient(patientID) {
    const patientRFC = ref(db, 'patients/' + patientID);
    try {
        const snapshot = await get(patientRFC);
        let data = snapshot.val();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export function deleteUser(patientID){
    set(ref(db, 'patients/' + patientID), null);
}

// writePatient("82394123", "Juan", "Carlos", "Perez", "Gonzalez", 23, "M", "123456789", "juan@perez.com")
// writePatient("82394124", "Maria", "Luisa", "Gonzalez", "Perez", 23, "F", "123456789", "maria@gonzalez.com")
// writePatient("82394125", "Pedro", "Carlos", "Gonzalez", "Perez", 23, "M", "123456789", "pedro@gonzalez.com")
// writePatient("82394126", "Ana", "Maria", "Perez", "Gonzalez", 23, "F", "123456789", "maria@gonzalez.com")
// writePatient("82394127", "Jose", "Luis", "Gonzalez", "Perez", 23, "M", "123456789", "jose@gonzalez.com")
// writePatient("82394128", "Luis", "Carlos", "Perez", "Gonzalez", 23, "M", "123456789", "luis@perez.com")