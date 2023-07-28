import './App.css';
import { RouterProvider } from 'react-router-dom';
import useDocumentTitle from './hooks/useDocumentTitle';
import { router } from './routes/routes';

function App() {

  useDocumentTitle('Lawyers Firm')

  return (
    <RouterProvider router={router} />
  );
}

export default App;
