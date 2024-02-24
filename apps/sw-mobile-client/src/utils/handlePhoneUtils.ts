import {Alert, Linking} from 'react-native';

export const handlePhoneCall = (phoneNumber: string) => {
  const _handlePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  Alert.alert(
    'Call',
    `Call ${phoneNumber}?`,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: _handlePhoneCall},
    ],
    {cancelable: false},
  );
};

export const handleSms = (phoneNumber: string) => {
  const _handleSms = () => {
    Linking.openURL(`sms:${phoneNumber}`);
  };
  Alert.alert(
    'Text',
    `Text ${phoneNumber}?`,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: _handleSms},
    ],
    {cancelable: false},
  );
};

export const handleEmail = (email: string) => {
  const _handleEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };
  Alert.alert(
    'Email',
    `Email ${email}?`,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: _handleEmail},
    ],
    {cancelable: false},
  );
};
