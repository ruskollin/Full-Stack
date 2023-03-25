import express from 'express';
import diagnosesService from '../services/diagnosesService';
import patientsService from '../services/patientsService';

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
  const { name, occupation, ssn, dateOfBirth, gender } = req.body;
  const addedEntry = patientsService.addPatient(
    name,
    occupation,
    ssn,
    dateOfBirth,
    gender
  );
  res.json(addedEntry);
});

export default router;