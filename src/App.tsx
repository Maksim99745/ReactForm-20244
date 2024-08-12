import { RouterProvider } from 'react-router-dom';
import './App.css';
import LoaderSpinner from './components/LoaderSpinner';
import { router } from './core/api/routing/router';

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<LoaderSpinner />} />
    </div>
  );
}
