import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a operating system data
interface MachineAttr {
  macA: string;
  osType: string;
  upTime?: number;
  freemem?: number;
  totalmem?: number;
  usedMem?: number;
  memUsage?: number;
  cpuModal?: string; // remember to do cast
  numOfCores?: number;
  cpuSpeed?: number;
  cpus?: number; // remember to do cast
  cpuLoad?: number;
}

// An interface that describes the properties
// that a User Model has
interface MachineModal extends mongoose.Model<MachineDoc> {
  build(attrs: MachineAttr): MachineDoc;
}

// An interface that describes the properties
// that a User Document has
interface MachineDoc extends mongoose.Document {
  macA: String;
  osType: String;
  upTime: Number;
  freemem: Number;
  totalmem: Number;
  usedMem: Number;
  memUsage: Number;
  cpuModal: String; // remember to cast
  numOfCores: Number;
  cpuSpeed: Number;
  cpus: Number; // remember to do cast
  cpuLoad: Number;
}

const machineSchema = new mongoose.Schema(
  {
    macA: String,
    osType: String,
    upTime: Number,
    freemem: Number,
    totalmem: Number,
    usedMem: Number,
    memUsage: Number,
    cpuModal: String, // remember to cast
    numOfCores: Number,
    cpuSpeed: Number,
    cpus: Number, // remember to do cast
    cpuLoad: Number,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

machineSchema.statics.build = (attrs: MachineAttr) => {
  return new Machine(attrs);
};

const Machine = mongoose.model<MachineDoc, MachineModal>(
  'Machine',
  machineSchema
);

export { Machine };
