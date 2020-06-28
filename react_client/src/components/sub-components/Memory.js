import React from 'react';
import drawCircle from '../../utilities/canvas-load-animations';

export const Memory = (props) => {
  const { totalmem, usedMem, memUsage, freemem, memWidgetId } = props.memData;
  const canvas = document.querySelector(`.${props.memData.memWidgetId}`);
  drawCircle(canvas, memUsage * 100);
  const totalMemInGB = (((totalmem / 1073741824) * 100) / 100).toFixed(2);
  const freeMemInGB = Math.floor((freemem / 1073741824) * 100) / 100;
  return (
    <div className='col-sm-3 mem'>
      <h3>Memory Useage</h3>
      <div className='canvas-wrapper'>
        <canvas
          className={props.memData.memWidgetId}
          width='200'
          height='200'
        ></canvas>
        <div className='mem-text'>{memUsage * 100}%</div>
      </div>
      <div>Total Memory: {totalMemInGB}gb</div>
      <div>Free Memory: {freeMemInGB}gb</div>
    </div>
  );
};
