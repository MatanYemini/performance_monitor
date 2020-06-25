import os from 'os';

interface ICpuAvg {
  idle: number;
  total: number;
}

export class OsData {
  private static _instance: OsData;
  private _osType: string;
  public upTime?: number;
  public freemem?: number;
  public totalmem?: number;
  public usedMem?: number;
  public memUsage?: number;
  public cpuModal?: Object;
  public numOfCores?: number;
  public cpuSpeed?: number;
  public _cpus?: os.CpuInfo[];

  private constructor() {
    this._osType = os.type() == 'Darwin' ? 'Mac' : os.type();
  }

  public static getInstance(): OsData {
    if (!OsData._instance) {
      OsData._instance = new OsData();
    }

    return OsData._instance;
  }

  public get osType(): string {
    return this._osType;
  }

  public cpuAvarge(): ICpuAvg {
    let idleMs = 0;
    let totalMs = 0;

    this._cpus?.forEach((aCore) => {
      idleMs += aCore.times.idle;
      totalMs +=
        aCore.times.user +
        aCore.times.sys +
        aCore.times.nice +
        aCore.times.irq +
        aCore.times.idle;
    });
    return {
      idle: idleMs / this._cpus!.length,
      total: totalMs / this._cpus!.length,
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
    this._cpus = os.cpus();
    this.upTime = os.uptime();
    this.freemem = os.freemem();
    this.totalmem = os.totalmem();
    this.usedMem = this.totalmem - this.freemem;
    this.memUsage = Math.floor((this.usedMem / this.totalmem) * 100) / 100;
    this.cpuModal = this._cpus[0].model;
    this.numOfCores = this._cpus.length;
    this.cpuSpeed = this._cpus[0].speed;
  }
}
