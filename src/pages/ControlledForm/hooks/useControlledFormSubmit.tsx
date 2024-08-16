import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControlledFormData } from '../../../models/ControlledFormData';
import imageToBase64 from '../../../utils/imageToBase64';
import { useActions } from '../../Main/hooks/useMainPageActions';

export const useControlledFormSubmit = () => {
  const { addControlledFormData } = useActions();

  const [showPasswordStrength, setShowPasswordStrength] = useState<'visible' | 'invisible'>('invisible');
  const navigate = useNavigate();
  const onSubmit = async (formData: ControlledFormData) => {
    const avatarBase64 = await imageToBase64(formData.avatar);
    const formDataWithImage = { ...formData, avatar: avatarBase64 };
    addControlledFormData(formDataWithImage);
    setShowPasswordStrength('invisible');
    navigate('/');
  };

  return { showPasswordStrength, setShowPasswordStrength, onSubmit };
};
