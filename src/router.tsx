import { createBrowserRouter } from 'react-router-dom';

//PAGES
import { Layout } from './components/layout';
import { Home } from './pages/home';
import { Detail } from './pages/detail';
import { Notfound } from './pages/notfound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail/:cripto',
        element: <Detail />,
      },
      {
        path: '*',
        element: <Notfound />,
      },
    ],
  },
]);

export { router };
