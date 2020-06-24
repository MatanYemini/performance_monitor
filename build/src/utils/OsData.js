"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var OsData = /** @class */ (function () {
    function OsData() {
        this._osType = os_1.default.type() == 'Darwin' ? 'Mac' : os_1.default.type();
        this._cpus = os_1.default.cpus();
    }
    OsData.getInstance = function () {
        if (!OsData._instance) {
            OsData._instance = new OsData();
        }
        return OsData._instance;
    };
    Object.defineProperty(OsData.prototype, "osType", {
        get: function () {
            return this._osType;
        },
        enumerable: true,
        configurable: true
    });
    OsData.prototype.cpuAvarge = function () {
        var idleMs = 0;
        var totalMs = 0;
        this._cpus.forEach(function (aCore) {
            idleMs += aCore.times.idle;
            totalMs +=
                aCore.times.user + aCore.times.sys + aCore.times.nice + aCore.times.irq;
        });
        return {
            idle: idleMs / this._cpus.length,
            total: totalMs / this._cpus.length,
        };
    };
    OsData.prototype.updateData = function () {
        this.upTime = os_1.default.uptime();
        this.freemem = os_1.default.freemem();
        this.totalmem = os_1.default.totalmem();
        this.usedMem = this.totalmem - this.freemem;
        this.memUsage = Math.floor((this.usedMem / this.totalmem) * 100) / 100;
        this.cpuModal = this._cpus[0].model;
        this.numOfCores = this._cpus.length;
        this.cpuSpeed = this._cpus[0].speed;
    };
    return OsData;
}());
exports.OsData = OsData;
//# sourceMappingURL=OsData.js.map