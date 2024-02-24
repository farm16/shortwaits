import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentDeviceInfo } from '../slices/device-info';

export const useDeviceInfo = () => {
  const deviceInfo = useSelector(selectCurrentDeviceInfo);
  return useMemo(() => deviceInfo, [deviceInfo]);
};
