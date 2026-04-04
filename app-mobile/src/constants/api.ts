import { Platform } from 'react-native';

const ANDROID_LOCALHOST = '10.0.2.2';
const IOS_LOCALHOST = 'localhost';

const host = Platform.OS === 'android' ? ANDROID_LOCALHOST : IOS_LOCALHOST;

export const API_BASE_URL = `http://${host}:3000`;
