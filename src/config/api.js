// API Configuration
// The frontend and backend share the same origin:
//  - Production: Vercel serves the static build AND routes /api/* to the serverless function.
//  - Development: Vite proxies /api to the backend (see vite.config.js -> server.proxy).
// So a plain relative /api works in every environment — no env vars, no URL resolution.
export const API_URL = '/api';
