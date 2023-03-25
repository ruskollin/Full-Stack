import express from 'express';
import diagnosesService from '../services/diagnosesService';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(diagnosesService.getDiagnoses());
});

router.get('/', (_req, res) => {
  res.send('Hello!');
});

router.get('/patients', (_req, res) => {
  res.send(patientsService.getPatientListWithoutSSN());
});

router.get('/patients/:id', (req, res) => {
  const patient = patientsService.findPatientById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    console.log('new patient added: ', newPatient)
    const addedEntry = patientsService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;