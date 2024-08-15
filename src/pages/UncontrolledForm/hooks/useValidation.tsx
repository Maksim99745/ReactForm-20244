import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { schema } from '../../../core/schemas/schemas';
import imageToBase64 from '../../../utils/imageToBase64';
import { useActions } from '../../hooks/useMainPageActions';

const useValidation = () => {
  const [showPasswordStrength, setShowPasswordStrength] = useState<'visible' | 'invisible'>('invisible');
  const [isNotAbleToSubmit, setIsNotAbleToSubmit] = useState(false);
  const [errorMessages, setErrorMessages] = useState<yup.ValidationError[] | []>([]);
  const { addUncontrolledFormData } = useActions();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(data.entries());
    try {
      const formData = await schema.validate(formValues, { abortEarly: false });
      const avatarBase64 = await imageToBase64(formData.avatar);
      const formDataWithImage = { ...formData, avatar: avatarBase64 };
      addUncontrolledFormData(formDataWithImage);
      setErrorMessages([]);
      setShowPasswordStrength('invisible');
      navigate('/');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setShowPasswordStrength('invisible');
        setErrorMessages(error.inner);
        setIsNotAbleToSubmit(true);
      }
    }
  };

  const findError = (name: string): string | null => {
    const error = errorMessages.find((errorName) => errorName.path === name);
    return error ? error.message : null;
  };

  const handleUnBlockForm = () => {
    if (isNotAbleToSubmit) {
      setIsNotAbleToSubmit(false);
    }
  };

  return {
    handleSubmit,
    findError,
    handleUnBlockForm,
    isNotAbleToSubmit,
    showPasswordStrength,
    setShowPasswordStrength,
  };
};

export default useValidation;
