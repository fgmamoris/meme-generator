import React, { useState } from 'react';
import '../static/css/ContentButtons.css';
import { Button } from 'react-bootstrap';

const ContentButtons = ({ data, action }) => {
  const handleButtonNumber = (e) => {
    if (data.combination) {
      if (data.secValue === '0' || data.secValue === 0) {
        action({
          ...data,
          value: data.value + e.target.value,
          secValue: e.target.value,
        });
      } else {
        action({
          ...data,
          value: data.value + e.target.value,
          secValue: data.secValue + e.target.value,
        });
      }
    } else {
      if (data.value === '0' || data.value === 0) {
        action({
          ...data,
          value: e.target.value,
        });
      } else {
        action({
          ...data,
          value: data.value + e.target.value,
        });
      }
    }
  };

  const handleButtonOperator = (e) => {
    if (data.value === '0' || data.value === 0) {
      action({
        ...data,
        value: e.target.value,
      });
    } else {
      if (
        data.value.endsWith('-') ||
        data.value.endsWith('*') ||
        data.value.endsWith('/') ||
        data.value.endsWith('+')
      ) {
        action({
          ...data,
          value: data.value.slice(0, -1) + e.target.value,
        });
      } else {
        action({
          ...data,
          value: data.value + e.target.value,
        });
      }
    }
  };

  const handleButtonReset = () => {
    action({
      prev: '0',
      value: '0',
      display: '0',
      operation: '',
      secValue: '0',
      combination: false,
    });
  };
  const handleOperationCombinated = () => {
    const value1 = eval(data.prev);
    const value2 = eval(data.secValue);
    console.log(value1);
    console.log(value2);
    let result;
    switch (data.operation) {
      case 'exp':
        result = String(Math.pow(value1, value2));
        console.log(result);
        break;
      case 'sqrtn':
        result = String(Math.pow(value1, 1 / value2));
        break;
      default:
        break;
    }
    action({
      ...data,
      prev: '0',
      value: result,
      display: result,
      combination: false,
      secValue: '0',
    });
  };
  const handleButtonOperation = (e) => {
    try {
      let value = eval(data.value);
      let valueStr = String(value);
      switch (e.target.value) {
        case 'eq':
          if (data.combination) {
            handleOperationCombinated();
          } else {
            action({
              ...data,
              prev: valueStr,
              value: valueStr,
              display: valueStr,
              combination: false,
              secValue: '0',
            });
          }
          break;
        case 'C':
          if (valueStr.length === 1) {
            valueStr = '0';
          } else {
            valueStr = valueStr.slice(0, -1);
          }
          if (!data.combination) {
            action({
              ...data,
              prev: valueStr,
              value: valueStr,
              display: valueStr,
            });
          } else {
            action({
              ...data,
              secValue: valueStr,
              value: valueStr,
              display: valueStr,
            });
          }

          break;
        case 'fact':
          let f = 1;
          let num = value;
          for (let i = 1; i <= num; i++) {
            f = f * i;
          }
          let fStr = String(f);
          action({ ...data, prev: fStr, value: fStr, display: fStr });
          break;
        case 'pow':
          const pow = String(Math.pow(value, 2));
          action({ ...data, prev: pow, value: pow, display: pow });
          break;
        case 'sqrt':
          const sqrt = String(Math.sqrt(value));
          if (sqrt !== 'NaN') {
            action({ ...data, prev: sqrt, value: sqrt, display: sqrt });
          } else handleError();
          break;
        case 'sqrtn':
          action({
            ...data,
            prev: valueStr,
            value: value + '√',
            combination: true,
            operation: 'sqrtn',
          });

          break;
        case 'sin':
          const sin = String(Math.sin(value));
          action({ ...data, prev: sin, value: sin, display: sin });
          break;
        case 'cos':
          const cos = String(Math.cos(value));
          action({ ...data, prev: cos, value: cos, display: cos });
          break;
        case 'tg':
          const tg = String(Math.tan(value));
          action({ ...data, prev: tg, value: tg, display: tg });
          break;
        case 'pow3':
          const pow3 = String(Math.pow(value, 3));
          action({ ...data, prev: pow3, value: pow3, display: pow3 });
          break;
        case 'cbrt':
          const cbrt = String(Math.cbrt(value));
          action({ ...data, prev: cbrt, value: cbrt, display: cbrt });
          break;
        case 'exp':
          action({
            ...data,
            prev: valueStr,
            value: value + ' ^ ',
            combination: true,
            operation: 'exp',
          });
          break;
        case '%':
          const porcentual = String(value / 100);
          action({
            ...data,
            prev: porcentual,
            value: porcentual,
            display: porcentual,
          });
          break;
        case 'ln':
          if (value > 0) {
            const ln = String(Math.log(value));
            action({ ...data, prev: ln, value: ln, display: ln });
          }

          break;
        case 'log':
          if (value > 0) {
            const ln = String(Math.log10(value));
            action({ ...data, prev: ln, value: ln, display: ln });
          }
          break;
        case 'e':
          action({
            ...data,
            combination: true,
          });
          break;
        case 'pi':
          let pi;
          console.log(Math.PI);
          if (value !== 0) {
            console.log('Entro');
            pi = String(Math.PI * value);
            console.log('Entro');
          } else {
            pi = String(Math.PI);
          }
          action({ ...data, prev: pi, value: pi, display: pi });
          break;

        default:
          /* handleError(); */
          break;
      }
    } catch (error) {
      handleError();
    }
  };
  const handleError = () => {
    action({
      prev: 0,
      value: 0,
      display: 'Error de sintaxis',
      operation: '',
      secValue: '0',
      combination: false,
    });
  };

  return (
    <div className="buttons_content__calculator">
      <Button
        className="operator"
        value="C"
        onClick={(e) => handleButtonOperation(e)}
      >
        C
      </Button>
      <Button className="operator">)</Button>
      <Button
        className="operator"
        value="fact"
        onClick={(e) => handleButtonOperation(e)}
      >
        !x
      </Button>
      <Button
        className="operator"
        value="pow"
        onClick={(e) => handleButtonOperation(e)}
      >
        x <sup>2</sup>
      </Button>
      <Button
        className="operator"
        value="sqrt"
        onClick={(e) => handleButtonOperation(e)}
      >
        √
      </Button>
      <Button
        className="operator"
        value="sqrtn"
        onClick={(e) => handleButtonOperation(e)}
      >
        <sup>n</sup>√
      </Button>
      <Button
        className="operator"
        value="sin"
        onClick={(e) => handleButtonOperation(e)}
      >
        sin
      </Button>
      <Button
        className="operator"
        value="cos"
        onClick={(e) => handleButtonOperation(e)}
      >
        cos
      </Button>
      <Button
        className="operator"
        value="tg"
        onClick={(e) => handleButtonOperation(e)}
      >
        tg
      </Button>
      <Button
        className="operator"
        value="pow3"
        onClick={(e) => handleButtonOperation(e)}
      >
        x <sup>3</sup>
      </Button>
      <Button
        className="operator"
        value="cbrt"
        onClick={(e) => handleButtonOperation(e)}
      >
        ∛
      </Button>
      <Button
        className="operator"
        value="exp"
        onClick={(e) => handleButtonOperation(e)}
      >
        x<sup>n</sup>
      </Button>
      <Button
        className="operator"
        value="1"
        onClick={(e) => handleButtonNumber(e)}
      >
        1
      </Button>
      <Button
        className="operator"
        value="2"
        onClick={(e) => handleButtonNumber(e)}
      >
        2
      </Button>
      <Button
        className="operator"
        value="3"
        onClick={(e) => handleButtonNumber(e)}
      >
        3
      </Button>
      <Button
        className="operator"
        value="/"
        onClick={(e) => handleButtonOperator(e)}
      >
        /
      </Button>
      <Button
        className="operator"
        value="%"
        onClick={(e) => handleButtonOperation(e)}
      >
        %
      </Button>
      <Button
        className="operator"
        value="ln"
        onClick={(e) => handleButtonOperation(e)}
      >
        ln
      </Button>
      <Button
        className="operator"
        value="4"
        onClick={(e) => handleButtonNumber(e)}
      >
        4
      </Button>
      <Button
        className="operator"
        value="5"
        onClick={(e) => handleButtonNumber(e)}
      >
        5
      </Button>
      <Button
        className="operator"
        value="6"
        onClick={(e) => handleButtonNumber(e)}
      >
        6
      </Button>
      <Button
        className="operator"
        value="*"
        onClick={(e) => handleButtonOperator(e)}
      >
        *
      </Button>
      <Button
        className="operator"
        value="log"
        onClick={(e) => handleButtonOperation(e)}
      >
        log
      </Button>
      <Button
        className="operator"
        value="e"
        onClick={(e) => handleButtonOperation(e)}
      >
        e
      </Button>
      <Button
        className="operator"
        value="7"
        onClick={(e) => handleButtonNumber(e)}
      >
        7
      </Button>
      <Button
        className="operator"
        value="8"
        onClick={(e) => handleButtonNumber(e)}
      >
        8
      </Button>
      <Button
        className="operator"
        value="9"
        onClick={(e) => handleButtonNumber(e)}
      >
        9
      </Button>
      <Button
        className="operator"
        value="-"
        onClick={(e) => handleButtonOperator(e)}
      >
        -
      </Button>
      <Button className="operator" onClick={handleButtonReset}>
        AC
      </Button>
      <Button
        className="operator"
        value="."
        onClick={(e) => handleButtonNumber(e)}
      >
        .
      </Button>
      <Button
        className="operator"
        value="0"
        onClick={(e) => handleButtonNumber(e)}
      >
        0
      </Button>
      <Button
        className="operator"
        value="pi"
        onClick={(e) => handleButtonOperation(e)}
      >
        π
      </Button>
      <Button
        className="operator"
        value="+"
        onClick={(e) => handleButtonOperator(e)}
      >
        +
      </Button>
      <Button
        className="operator"
        value="MR"
        onClick={(e) => handleButtonOperation(e)}
      >
        MR
      </Button>
      <Button
        className="equal__sign"
        value="eq"
        onClick={(e) => handleButtonOperation(e)}
      >
        =
      </Button>
    </div>
  );
};

export default ContentButtons;
