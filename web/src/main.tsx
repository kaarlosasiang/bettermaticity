import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './i18n';
import './index.css';

// vite-react-ssg entry: exports a `createRoot` the framework drives for both
// SSG prerender (server) and hydration (client).
export const createRoot = ViteReactSSG({ routes });
