import os from 'os';

interface ICpuAvg {
  idle: number;
  total: number;
}

interface IOsData {
  osType: string;
  upTime?: number;
  freemem?: number;
  totalmem?: number;
  usedMem?: number;
  memUsage?: number;
  cpuModal?: Object;
  numOfCores?: number;
  cpuSpeed?: number;
  cpus?: os.CpuInfo[];
  cpuLoad?: number;
}

export class OsData implements IOsData {
  private static _instance: OsData;
  public osType: string;
  public upTime?: number;
  public freemem?: number;
  public totalmem?: number;
  public usedMem?: number;
  public memUsage?: number;
  public cpuModal?: Object;
  public numOfCores?: number;
  public cpuSpeed?: number;
  public cpus?: os.CpuInfo[];
  public cpuLoad?: number;

  private constructor() {
    this.osType = os.type() == 'Darwin' ? 'Mac' : os.type();
  }

  public static getInstance(): OsData {
    if (!OsData._instance) {
      OsData._instance = new OsData();
    }

    return OsData._instance;
  }

  public cpuAvarge(): ICpuAvg {
    let idleMs = 0;
    let totalMs = 0;

    this.cpus?.forEach((aCore) => {
      idleMs += aCore.times.idle;
      totalMs +=
        aCore.times.user +
        aCore.times.sys +
        aCore.times.nice +
        aCore.times.irq +
        aCore.times.idle;
    });
    return {
      idle: idleMs / this.cpus!.length,
      total: totalMs / this.cpus!.length,
    };
  }

  public getCpuLoad(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.updateData();
      const start = this.cpuAvarge();
      setTimeout(() => {
        this.updateData();
        const end = this.cpuAvarge();
        const idleDifference = end.idle - start.idle;
        const totalDifference = end.total - start.total;
        const percentageCpu =
          100 - Math.floor((100 * idleDifference) / totalDifference);
        resolve(percentageCpu);
      }, 1000);
    });
  }

  public updateData(): void {
    this.cpus = os.cpus();
    this.upTime = os.uptime();
    this.freemem = os.freemem();
    this.totalmem = os.totalmem();
    this.usedMem = this.totalmem - this.freemem;
    this.memUsage = Math.floor((this.usedMem / this.totalmem) * 100) / 100;
    this.cpuModal = this.cpus[0].model;
    this.numOfCores = this.cpus.length;
    this.cpuSpeed = this.cpus[0].speed;
  }

  public performanceData(): Promise<IOsData> {
    return new Promise(async (resolve, reject) => {
      this.updateData();
      this.cpuLoad = await this.getCpuLoad();
      resolve(this);
    });
  }
}
