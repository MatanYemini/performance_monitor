"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var OsData_1 = require("./utils/OsData");
var data = OsData_1.OsData.getInstance();
function getCpuLoad() {
    var start = data.cpuAvarge();
    setTimeout(function () {
        var end = data.cpuAvarge();
        var idleDifference = end.idle - start.idle;
        var totalDifference = end.total - start.total;
        var percentageCpu = 100 - Math.floor((100 * idleDifference) / totalDifference);
        console.log(percentageCpu);
    }, 100);
}
setInterval(function () {
    getCpuLoad();
}, 1000);
var app = express_1.default();
exports.app = app;
//# sourceMappingURL=app.js.map