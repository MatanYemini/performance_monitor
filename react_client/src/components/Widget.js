import React from 'react';
import { Cpu } from './sub-components/Cpu';
import { Memory } from './sub-components/Memory';
import { Info } from './sub-components/Info';

export const Widget = () => {
  return (
    <div>
      <h1>Widget!</h1>
      <Cpu />
      <Memory />
      <Info />
    </div>
  );
};
