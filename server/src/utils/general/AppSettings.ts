export interface IConfig {
  host: string;
  port: number;
}

export interface IMongoConfig {
  mongoUri: string;
}

interface INodeClient {
  type_str: 'node_client';
}

interface IReactClient {
  type_str: 'react_client';
}

export type Client = INodeClient | IReactClient;
