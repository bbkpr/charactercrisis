import { Config } from '../config';

export function mockTestConfig() {
  return jest.mock<Config>('../config', () => ({
    supabaseAnonKey: '12345',
    supabaseUrl: 'https://abc123.supabase.co'
  })) as unknown as Config;
}
