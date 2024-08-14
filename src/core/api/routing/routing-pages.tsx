import { lazy } from 'react';

const MainPage = lazy(() => import('../../../pages/Main/MainPage'));
const NotFoundPage = lazy(() => import('../../../pages/NotFoundPage/NotFound'));
const UncontrolledForm = lazy(() => import('../../../pages/UncontrolledForm/UncontrolledForm'));
const ControlledForm = lazy(() => import('../../../pages/ControlledForm/ControlledForm'));

export { ControlledForm, MainPage, NotFoundPage, UncontrolledForm };
