import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Info(props) {
  const [time, setTime] = useState(props.infoData.upTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(props.infoData.upTime), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='col-sm-3 col-sm-offset-1 cpu-info'>
      <h3>Operating System</h3>
      <div className='widget-text'>{props.infoData.osType}</div>
      <h3>Time Online</h3>
      <div className='widget-text'>{moment.duration(time).humanize()}</div>
      <h3>Processor information</h3>
      <div className='widget-text'>
        <strong>Type:</strong> {props.infoData.cpuModel}
      </div>
      <div className='widget-text'>
        <strong>Number of Cores:</strong> {props.infoData.cpuNumCores}
      </div>
      <div className='widget-text'>
        <strong>Clock Speed:</strong> {props.infoData.cpuSpeed}
      </div>
    </div>
  );
}

export default Info;
