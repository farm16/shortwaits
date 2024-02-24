import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentAuthState } from '../slices/auth';

export const useAuth = () => {
  const auth = useSelector(selectCurrentAuthState);
  return useMemo(() => auth, [auth]);
};
