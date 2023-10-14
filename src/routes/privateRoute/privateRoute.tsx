import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux';
import { PrivateRouteProperties } from './privateRoute.type';

const PrivateRoute: React.FC<PrivateRouteProperties> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.userState.accessToken);
  const isAuth = !!accessToken;

  if (!isAuth) {
    return <Navigate to="/signin" />;
  }
  return children;
};
export { PrivateRoute };
