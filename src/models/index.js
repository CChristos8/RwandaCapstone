// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Drug, TimeBasedIndicatorsIntra, TimeBasedIndicatorsAnes, Record, IntraoperativeRecord, Operation, Practitioner, Nurse, Patient, Hospital, DrugTimeBasedIndicatorsIntra } = initSchema(schema);

export {
  Drug,
  TimeBasedIndicatorsIntra,
  TimeBasedIndicatorsAnes,
  Record,
  IntraoperativeRecord,
  Operation,
  Practitioner,
  Nurse,
  Patient,
  Hospital,
  DrugTimeBasedIndicatorsIntra
};