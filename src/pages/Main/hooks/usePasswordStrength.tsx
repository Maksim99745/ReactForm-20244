import { useState } from 'react';

type StrengthLevels = 'low' | 'middle' | 'good';

const usePasswordStrength = () => {
  const [strengthLevel, setStrengthLevel] = useState('low');
  const regexArray = [/\d/, /[A-Z]/, /[a-z]/, /[!@#$%^&*(),.?":{}|<>]/];

  const strengthLevels: { [key: number]: StrengthLevels } = {
    0: 'low',
    1: 'low',
    2: 'middle',
    3: 'middle',
    4: 'good',
  };

  const checkTheStrength = (password: string) => {
    let strengthScore = 0;
    regexArray.forEach((regex) => {
      if (regex.test(password)) {
        strengthScore += 1;
      }
    });
    setStrengthLevel(strengthLevels[strengthScore] || 'low');
  };

  return { checkTheStrength, strengthLevel };
};

export default usePasswordStrength;
