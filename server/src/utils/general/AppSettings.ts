export interface IConfig {
  host: string;
  port: number;
}

export interface IMongoConfig {
  mongoUri: string;
}

export type Client = 'node_client' | 'react_client';
