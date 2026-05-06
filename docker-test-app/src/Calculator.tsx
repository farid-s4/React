import { useState, useEffect } from 'react';
import './Calculator.css';

interface HistoryItem {
  expression: string;
  result: string;
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/\d/.test(e.key)) handleNumberClick(e.key);
      if (e.key === '.') handleDecimal();
      if (e.key === '+' || e.key === '-') handleOperation(e.key);
      if (e.key === '*') handleOperation('×');
      if (e.key === '/') {
        e.preventDefault();
        handleOperation('÷');
      }
      if (e.key === 'Enter') handleEquals();
      if (e.key === 'Backspace') handleBackspace();
      if (e.key === 'Escape') handleClear();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, previousValue, operation, waitingForOperand]);

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation && !waitingForOperand) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      const expression = `${previousValue} ${operation} ${inputValue}`;

      setHistory([{ expression, result: String(result) }, ...history.slice(0, 9)]);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleHistoryClick = (expression: string) => {
    const result = expression.split(' ').pop();
    if (result) {
      setDisplay(result);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-display">
          <input type="text" value={display} readOnly className="display-input" />
          {operation && <span className="operation-indicator">{operation}</span>}
        </div>

        <div className="buttons-grid">
          <button className="btn btn-function" onClick={handleClear}>AC</button>
          <button className="btn btn-function" onClick={handleBackspace}>⌫</button>
          <button className="btn btn-function" onClick={() => handleOperation('÷')}>÷</button>
          <button className="btn btn-function" onClick={() => handleOperation('×')}>×</button>

          {[7, 8, 9].map(num => (
            <button key={num} className="btn btn-number" onClick={() => handleNumberClick(String(num))}>
              {num}
            </button>
          ))}
          <button className="btn btn-operation" onClick={() => handleOperation('-')}>−</button>

          {[4, 5, 6].map(num => (
            <button key={num} className="btn btn-number" onClick={() => handleNumberClick(String(num))}>
              {num}
            </button>
          ))}
          <button className="btn btn-operation" onClick={() => handleOperation('+')}>+</button>

          {[1, 2, 3].map(num => (
            <button key={num} className="btn btn-number" onClick={() => handleNumberClick(String(num))}>
              {num}
            </button>
          ))}
          <button className="btn btn-equals" onClick={handleEquals}>=</button>

          <button className="btn btn-number btn-zero" onClick={() => handleNumberClick('0')}>0</button>
          <button className="btn btn-number" onClick={handleDecimal}>.</button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="history">
          <h3>История</h3>
          <div className="history-list">
            {history.map((item, idx) => (
              <button
                key={idx}
                className="history-item"
                onClick={() => handleHistoryClick(item.expression + ' = ' + item.result)}
              >
                <span className="history-expression">{item.expression}</span>
                <span className="history-equals">=</span>
                <span className="history-result">{item.result}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
