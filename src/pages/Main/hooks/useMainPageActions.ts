import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as controlledActions } from '../../../store/controlledForm/controlledForm.slice';
import { actions as uncontrolledActions } from '../../../store/uncontrolledForm/uncontrolledForm.slice';

const rootActions = { ...uncontrolledActions, ...controlledActions };

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
