// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Keeping API_BASE_URL for backward compatibility if needed, though API_URL is preferred.
export const API_BASE_URL = API_URL.replace('/api', '');
