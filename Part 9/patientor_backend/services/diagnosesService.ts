import diagnosesData from '../data/diagnoses';

import { Diagnoses } from '../types';

const diagnoses: Diagnoses[] = diagnosesData as Diagnoses[];

const getDiagnoses = (): Diagnoses[] => {
    console.log(diagnoses)
    return diagnoses;
  };

export default {
  getDiagnoses
};