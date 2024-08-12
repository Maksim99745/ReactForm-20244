import { lazy } from 'react';

const MainPage = lazy(() => import('../../../pages/Main/MainPage'));
const NotFoundPage = lazy(() => import('../../../pages/NotFoundPage/NotFound'));

export { MainPage, NotFoundPage };
