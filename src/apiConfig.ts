const API_URL: string = process.env.NODE_ENV === 'production'
  ? 'https://insurance-partner.net'
  : 'http://localhost:3002';

export default API_URL;
