import {useState, useRef, useEffect} from 'react'
import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#1e90ff',
      secondary: '#f5f5f5',
      dark: '#333333',
    },
  },
})
interface CalculatorButtonProps {
  label: string;
  onClick: (label: string) => void;
}

export const CalculatorButton = ({ label, onClick }: CalculatorButtonProps) => (
  <button
    onClick={() => onClick(label)}
    className="p-4 m-1 border rounded-md w-16 text-lg hover:bg-primary hover:text-white"
  >
    {label}
  </button>
);

export const Calculator = () => {
  const [input, setInput] = useState<string>("");

  // 버튼 클릭 핸들러
  const handleClick = (value: string) => {
    setInput(input + value);
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-md shadow-md max-w-xs mx-auto bg-secondary">
      <div className="w-full p-4 mb-4 text-2xl text-right border border-dark rounded-md bg-white">
        {input || "0"}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["1", "2", "3", "+"].map((item) => (
          <CalculatorButton key={item} label={item} onClick={handleClick} />
        ))}
        {["4", "5", "6", "-"].map((item) => (
          <CalculatorButton key={item} label={item} onClick={handleClick} />
        ))}
        {["7", "8", "9", "*"].map((item) => (
          <CalculatorButton key={item} label={item} onClick={handleClick} />
        ))}
        <CalculatorButton label="C" onClick={clearInput} />
        <CalculatorButton label="0" onClick={handleClick} />
        <CalculatorButton label="=" onClick={calculate} />
        <CalculatorButton label="/" onClick={handleClick} />
      </div>
    </div>
  );
};

