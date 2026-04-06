import { Platform } from 'react-native';

// ─── API Configuration ───────────────────────────────────────────────
// Production/device: uses ngrok public URL (works from any network)
// Development: uses local network IPs for emulators/simulators
const NGROK_URL = 'https://000d-23-23-240-197.ngrok-free.app';

const ANDROID_LOCALHOST = '10.0.2.2';
const IOS_LOCALHOST = 'localhost';

const devHost = Platform.OS === 'android' ? ANDROID_LOCALHOST : IOS_LOCALHOST;
const DEV_URL = `http://${devHost}:5001`;

// Use ngrok for physical devices, localhost for emulators/simulators
export const API_BASE_URL = __DEV__ ? DEV_URL : NGROK_URL;
