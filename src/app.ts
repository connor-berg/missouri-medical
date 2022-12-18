import { App } from 'aws-cdk-lib';
import { MissouriMedicalStack } from './stacks/missouri-medical-stack';

const app = new App();
const startAPIStack = new MissouriMedicalStack(app, 'MissouriMedicalStack');