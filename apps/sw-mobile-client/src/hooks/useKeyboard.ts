import {useEffect, useState} from 'react';
import {Keyboard, KeyboardStatic} from 'react-native';

type KeyboardStatus = 'keyboardDidShow' | 'keyboardDidHide' | null;

export const useKeyboard = (): [KeyboardStatic, {status: KeyboardStatus}] => {
  const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStatus>(null);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('keyboardDidShow');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('keyboardDidHide');
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return [Keyboard, {status: keyboardStatus}];
};
