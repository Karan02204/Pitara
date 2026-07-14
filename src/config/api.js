// API Configuration
let envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
if (envUrl.endsWith('/')) envUrl = envUrl.slice(0, -1);
export const API_URL = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
export const API_BASE_URL = API_URL.replace(/\/api$/, '');
