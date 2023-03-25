import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

//also enough
//   const isString = (text: unknown): text is string => {
//     return typeof text === 'string';
//    }

const parseString = (value: unknown, field: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

//maybe an option
//   const isGender = (str: string): str is Gender => {
//     return ['male', 'female', 'other'].includes(gender);
//   };

const isGender = (param: any): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseString(object.name, "name"),
    ssn: parseString(object.ssn, "ssn"),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseString(object.occupation, "occupation"),
    gender: parseGender(object.gender),
  };
  return newPatient;
};

export default toNewPatientEntry;
