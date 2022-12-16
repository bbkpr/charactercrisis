import { isEmpty, isNotEmpty } from 'class-validator';

export interface Config {
  supabaseAnonKey: string;
  supabaseUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const windowEnv = (window as any).env ?? {};
const getEnvFromProcessOrWindow = (envVar: string) =>
  isNotEmpty(process.env[envVar])
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      process.env[envVar]
    : windowEnv[envVar];

// `process.env` is used by default in Development, however it does not exist when hosted statically on nginx.
// We use `window.env` to support runtime environment variables in a web environment, using `/env.sh` to generate `/build/env-config.js`
// See https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/)
const supabaseAnonKey = getEnvFromProcessOrWindow('REACT_APP_SUPABASE_ANON_KEY');
const supabaseUrl = getEnvFromProcessOrWindow('REACT_APP_SUPABASE_URL');

if ([supabaseAnonKey, supabaseUrl].some(isEmpty)) {
  throw new Error('configuration error, one or more environment variables is missing from process.env and window.env');
}
const config: Config = {
  supabaseAnonKey,
  supabaseUrl
};

export default config;
