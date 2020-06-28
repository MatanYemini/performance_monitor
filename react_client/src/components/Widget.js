import React from 'react';
import Cpu from './sub-components/Cpu';
import { Memory } from './sub-components/Memory';
import Info from './sub-components/Info';

export const Widget = (props) => {
  const {
    macA,
    osType,
    upTime,
    freemem,
    totalmem,
    usedMem,
    memUsage,
    cpuModal,
    numOfCores,
    cpuSpeed,
    cpus,
    cpuLoad,
  } = props.data;
  const cpuWidgetId = `cpu-widget-${macA}`;
  const memWidgetId = `mem-widget-${macA}`;
  const cpu = { cpuLoad, cpuWidgetId };
  const mem = { totalmem, usedMem, memUsage, freemem, memWidgetId };
  const info = { macA, osType, upTime, cpuModal, numOfCores, cpuSpeed };

  return (
    <div>
      <h1>Widget!</h1>
      <Cpu cpuData={cpu} />
      <Memory memData={mem} />
      <Info infoData={info} />
    </div>
  );
};
