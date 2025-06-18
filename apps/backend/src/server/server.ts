import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './router';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';

export interface ServerOptions {
  dev?: boolean;
  port?: number;
  prefix?: string;
  environment: 'development' | 'production' | 'test' | 'local';
}

export function createServer(opts: ServerOptions) {
  const port = opts.port ?? 3000;
  const prefix = opts.prefix ?? '/trpc';

  const loggerConfig =
    opts.environment === 'local' || opts.environment === 'test'
      ? {
          level: 'debug',
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }
      : true;

  const server = fastify({ logger: loggerConfig });

  server.register(cors, {
    origin: '*',
    methods: '*',
    credentials: true,
  });

  server.register(fastifyTRPCPlugin, {
    prefix: prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  server.register(cookie, {
    secret: 'my-secret', // for cookies signature
    hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
    parseOptions: {}, // options for parsing cookies
  });

  const stop = () => server.close();
  const start = async () => {
    try {
      await server.ready();
      await server.listen({ port });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
