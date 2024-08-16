import { useState } from 'react';

export const usePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<'password' | 'text'>('password');
  const togglePasswordVisibility = () => {
    if (passwordVisibility === 'password') {
      setPasswordVisibility('text');
    } else {
      setPasswordVisibility('password');
    }
  };
  return { passwordVisibility, togglePasswordVisibility };
};
