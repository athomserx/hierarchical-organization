export type Environment = 'local' | 'dev' | 'master';

export interface EnvironmentInterface {
  environmentName: Environment;
  production: boolean;
  apiUrl: string;
}
