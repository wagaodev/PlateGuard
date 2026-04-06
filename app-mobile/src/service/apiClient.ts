import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

/**
 * Shared Axios instance for all API calls.
 * Single source of truth for baseURL, timeout, and default headers.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});
