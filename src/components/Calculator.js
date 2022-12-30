import React, { useState } from 'react';
import ContentButtons from './ContentButtons';
import Display from './Display';

const Calculator = () => {
  const [calc, setCalc] = useState({
    prev: '0',
    value: '0',
    display: '0',
    operation: '',
    secValue: '0',
    combination: false,
  });

  return (
    <div className="calculator">
      <Display display={calc.display} value={calc.value} />
      <ContentButtons data={calc} action={setCalc} />
    </div>
  );
};

export default Calculator;
