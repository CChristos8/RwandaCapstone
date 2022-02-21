import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type DrugMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TimeBasedIndicatorsIntraMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TimeBasedIndicatorsAnesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RecordMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type IntraoperativeRecordMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OperationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PractitionerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NurseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PatientMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type HospitalMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DrugTimeBasedIndicatorsIntraMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Drug {
  readonly id: string;
  readonly drugID?: string;
  readonly dName?: string;
  readonly dType?: string;
  readonly TimeBasedIndicatorsIntras?: (DrugTimeBasedIndicatorsIntra | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Drug, DrugMetaData>);
  static copyOf(source: Drug, mutator: (draft: MutableModel<Drug, DrugMetaData>) => MutableModel<Drug, DrugMetaData> | void): Drug;
}

export declare class TimeBasedIndicatorsIntra {
  readonly id: string;
  readonly timeStamp: number;
  readonly sysBP?: number;
  readonly diaBP?: number;
  readonly MAP?: number;
  readonly temp?: number;
  readonly tidalVolume?: number;
  readonly SpO2?: number;
  readonly EICO2?: number;
  readonly FlO2?: number;
  readonly Glurasis?: number;
  readonly drugDosages?: number;
  readonly bloodlessFhb?: number;
  readonly intraoperativerecordID: string;
  readonly drugs?: (DrugTimeBasedIndicatorsIntra | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TimeBasedIndicatorsIntra, TimeBasedIndicatorsIntraMetaData>);
  static copyOf(source: TimeBasedIndicatorsIntra, mutator: (draft: MutableModel<TimeBasedIndicatorsIntra, TimeBasedIndicatorsIntraMetaData>) => MutableModel<TimeBasedIndicatorsIntra, TimeBasedIndicatorsIntraMetaData> | void): TimeBasedIndicatorsIntra;
}

export declare class TimeBasedIndicatorsAnes {
  readonly id: string;
  readonly timeStamp?: string;
  readonly Record?: Record;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly timeBasedIndicatorsAnesRecordId?: string;
  constructor(init: ModelInit<TimeBasedIndicatorsAnes, TimeBasedIndicatorsAnesMetaData>);
  static copyOf(source: TimeBasedIndicatorsAnes, mutator: (draft: MutableModel<TimeBasedIndicatorsAnes, TimeBasedIndicatorsAnesMetaData>) => MutableModel<TimeBasedIndicatorsAnes, TimeBasedIndicatorsAnesMetaData> | void): TimeBasedIndicatorsAnes;
}

export declare class Record {
  readonly id: string;
  readonly submissionTime?: string;
  readonly notes?: string;
  readonly resolution?: boolean;
  readonly IntraoperativeRecord?: IntraoperativeRecord;
  readonly practitionerID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly recordIntraoperativeRecordId?: string;
  constructor(init: ModelInit<Record, RecordMetaData>);
  static copyOf(source: Record, mutator: (draft: MutableModel<Record, RecordMetaData>) => MutableModel<Record, RecordMetaData> | void): Record;
}

export declare class IntraoperativeRecord {
  readonly id: string;
  readonly EyeProtection?: boolean;
  readonly Warming?: boolean;
  readonly TEDStockings?: boolean;
  readonly SafetyChecklist?: boolean;
  readonly EasyVentilation?: boolean;
  readonly VertilizationWAdjust?: boolean;
  readonly DifficultVentilation?: boolean;
  readonly TimeBasedIndicators?: (TimeBasedIndicatorsIntra | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<IntraoperativeRecord, IntraoperativeRecordMetaData>);
  static copyOf(source: IntraoperativeRecord, mutator: (draft: MutableModel<IntraoperativeRecord, IntraoperativeRecordMetaData>) => MutableModel<IntraoperativeRecord, IntraoperativeRecordMetaData> | void): IntraoperativeRecord;
}

export declare class Operation {
  readonly id: string;
  readonly datetime?: string;
  readonly check_in_date?: string;
  readonly check_out_date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Operation, OperationMetaData>);
  static copyOf(source: Operation, mutator: (draft: MutableModel<Operation, OperationMetaData>) => MutableModel<Operation, OperationMetaData> | void): Operation;
}

export declare class Practitioner {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly gender?: string;
  readonly numPatients?: number;
  readonly hospitalID: string;
  readonly Records?: (Record | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Practitioner, PractitionerMetaData>);
  static copyOf(source: Practitioner, mutator: (draft: MutableModel<Practitioner, PractitionerMetaData>) => MutableModel<Practitioner, PractitionerMetaData> | void): Practitioner;
}

export declare class Nurse {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly gender?: string;
  readonly numPatients?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Nurse, NurseMetaData>);
  static copyOf(source: Nurse, mutator: (draft: MutableModel<Nurse, NurseMetaData>) => MutableModel<Nurse, NurseMetaData> | void): Nurse;
}

export declare class Patient {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly age?: number;
  readonly gender?: string;
  readonly hospitalID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Patient, PatientMetaData>);
  static copyOf(source: Patient, mutator: (draft: MutableModel<Patient, PatientMetaData>) => MutableModel<Patient, PatientMetaData> | void): Patient;
}

export declare class Hospital {
  readonly id: string;
  readonly region?: string;
  readonly hospital_type?: string;
  readonly numPractitioners?: number;
  readonly numPatients?: number;
  readonly Patients?: (Patient | null)[];
  readonly Practitioners?: (Practitioner | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Hospital, HospitalMetaData>);
  static copyOf(source: Hospital, mutator: (draft: MutableModel<Hospital, HospitalMetaData>) => MutableModel<Hospital, HospitalMetaData> | void): Hospital;
}

export declare class DrugTimeBasedIndicatorsIntra {
  readonly id: string;
  readonly drug: Drug;
  readonly timeBasedIndicatorsIntra: TimeBasedIndicatorsIntra;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<DrugTimeBasedIndicatorsIntra, DrugTimeBasedIndicatorsIntraMetaData>);
  static copyOf(source: DrugTimeBasedIndicatorsIntra, mutator: (draft: MutableModel<DrugTimeBasedIndicatorsIntra, DrugTimeBasedIndicatorsIntraMetaData>) => MutableModel<DrugTimeBasedIndicatorsIntra, DrugTimeBasedIndicatorsIntraMetaData> | void): DrugTimeBasedIndicatorsIntra;
}