import patientsData from "../data/patients";
import { Patient, PatientListWithoutSSN, NewPatientEntry } from "../types";
import { v4 as uuidv4 } from "uuid";

// const getPatients = (): Array<Patient> => {
//   return patientsData;
// };

const getPatientListWithoutSSN = (): Array<PatientListWithoutSSN> => {
  return patientsData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  const entry = patientsData.find((data) => data.id === id);
  return entry;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id = uuidv4();
  const newPatient = { id, ...patient };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  //   getPatients,
  getPatientListWithoutSSN,
  findPatientById,
  addPatient,
};
