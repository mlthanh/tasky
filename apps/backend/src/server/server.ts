import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './router';
import cors from '@fastify/cors';
import { googleOAuth } from '../configs/oauth.config';

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
  });

  server.get('/auth/google', async (req, reply) => {
    const url = googleOAuth.authorizeURL({
      redirect_uri: 'http://localhost:4200/auth/google/callback',
      scope: 'email profile',
    });
    reply.redirect(url);
  });

  server.register(fastifyTRPCPlugin, {
    prefix: prefix,
    trpcOptions: { router: appRouter, createContext },
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
