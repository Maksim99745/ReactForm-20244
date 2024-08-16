import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoaderSpinner from '../../../components/LoaderSpinner';
import { ControlledForm, MainPage, NotFoundPage, UncontrolledForm } from './routing-pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <MainPage />
      </Suspense>
    ),
    children: [],
  },
  {
    path: 'controlled-form',
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <ControlledForm />
      </Suspense>
    ),
  },
  {
    path: 'uncontrolled-form',
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <UncontrolledForm />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
