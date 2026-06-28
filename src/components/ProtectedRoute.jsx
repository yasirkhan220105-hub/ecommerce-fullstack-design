import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // Not logged in → go to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin → go to home
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // All good → show the page
  return children;
};

export default ProtectedRoute;