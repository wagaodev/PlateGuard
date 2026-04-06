import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to reach host machine
// iOS simulator uses localhost
// iOS physical device needs the host machine's local IP
const ANDROID_LOCALHOST = '10.0.2.2';
const IOS_LOCALHOST = __DEV__ ? '192.168.1.35' : 'localhost';

const host = Platform.OS === 'android' ? ANDROID_LOCALHOST : IOS_LOCALHOST;

export const API_BASE_URL = `http://${host}:5001`;
