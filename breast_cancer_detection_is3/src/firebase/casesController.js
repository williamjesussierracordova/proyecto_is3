import { getFirebaseDb } from "./firebase.js";
import { set, ref ,get, update} from "firebase/database";

const db = getFirebaseDb();

export function writeCases(caseID, patientID, doctorID, date, time, nameImage) {
    set(ref(db, 'cases/' + caseID), {
        caseID: caseID,
        patientID: patientID,
        doctorID: doctorID,
        date: date,
        time: time,
        nameImage: nameImage
    });
}

export async function readCases(caseID) {
    const snapshot = await get(ref(db, 'cases/' + caseID));
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}

export async function readCasesByPatient(patientID) {
    const casesRef = ref(db, 'cases');
  
    try {
      const snapshot = await get(casesRef);
      const allCases = snapshot.val();
      
      // Objeto para almacenar los casos coincidentes
      const matchingCases = {};
  
      // Iterar sobre todos los casos
      for (const [caseId, caseData] of Object.entries(allCases)) {
        if (caseData.patientID === patientID) {
          // Si el patientID coincide, guardar este caso
          matchingCases[caseId] = caseData;
        }
      }
  
      return matchingCases;
    } catch (error) {
      console.error("Error al buscar el paciente:", error);
      throw error;
    }
}

export async function readCasesByDoctor(doctorID) {
    const casesRef = ref(db, 'cases');
  
    try {
      const snapshot = await get(casesRef);
      const allCases = snapshot.val();
      
      // Objeto para almacenar los casos coincidentes
      const matchingCases = {};
  
      // Iterar sobre todos los casos
      for (const [caseId, caseData] of Object.entries(allCases)) {
        if (caseData.doctorID === doctorID) {
          // Si el doctorID coincide, guardar este caso
          matchingCases[caseId] = caseData;
        }
      }
  
      return matchingCases;
    } catch (error) {
      console.error("Error al buscar el doctor:", error);
      throw error;
    }
}

// export const updateCaseValidation = async (caseId, isValid, doctorComment) => {
//   try {
//     console.log(caseId, isValid, doctorComment);
//     console.log(db);
//     const caseRef = doc(db, "cases", caseId);
//     console.log(caseRef);
//     await updateDoc(caseRef, {
//       validationStatus: isValid,
//       doctorComment: doctorComment,
//       validationDate: new Date().toISOString()
//     });
//     console.log("Case validation updated successfully");
//   } catch (error) {
//     console.error("Error updating case validation: ", error);
//     throw error; // Re-lanza el error para que pueda ser manejado en el componente
//   }
// };

export const updateCaseValidation = async (caseId, isValid, doctorComment) => {
  try {
      const caseRef = ref(db, `cases/${caseId}`); // Referencia a la ubicación del caso en la base de datos
      await update(caseRef, {
          validationStatus: isValid,
          doctorComment: doctorComment,
          validationDate: new Date().toISOString(),
      });
      console.log("Case validation updated successfully");
      return true;
  } catch (error) {
      console.error("Error updating case validation:", error);
      throw error; // Re-lanza el error para que pueda ser manejado en el componente
  }
};

export const updateCasePrediction = async (caseId, predictionClass, predictionAccuracy) =>{
  try{
    const caseRef = ref(db, `cases/${caseId}`);
    await update(caseRef, {
      predictionClass: predictionClass,
      predictionAccuracy: predictionAccuracy
    });
    console.log("Case prediction updated successfully");
    return true;
  }
  catch(error){
    console.error("Error updating case prediction:", error);
    throw error;
  }

}

// prueba updateCaseValidation
