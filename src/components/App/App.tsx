import { useRoutes } from 'react-router-dom';
import { mainRoutes } from '../../routes';
import '../../assets/styles/global.scss';

function App() {
  const routes = useRoutes([mainRoutes]);
  return routes;
}

export { App };
