import React from 'react';
import '../static/css/Display.css';

const Display = (props) => {
  return (
    <div className="header__calculator">
      <div className="display__calculator">
        <div className="display__calculator__content">
          <h4 className="display__input mx-auto my-auto">{props.display}</h4>
          <p className="display__result mx-auto my-auto">{props.value}</p>
        </div>
      </div>
    </div>
  );
};

export default Display;
