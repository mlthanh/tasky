# tasky - Full stack Task management Project

## Libraries/frameworks

This project includes a bunch of libraries to get you up and running quickly and improve developer experience.

### Frontend

- [React](https://reactjs.org/) - main frontend library
- [Vite](https://vitejs.dev/) - modern and fast build tool
- [React Query](https://react-query-v3.tanstack.com/) - react hooks to facilitate fetching/updating/caching data on the server
- [Zustand](https://github.com/pmndrs/zustand) - easy state-management
- [React router](https://reactrouter.com/en/main) - for routing
- [Cypress](https://www.cypress.io/) - end-to-end testing for your frontend
- [Storybook](https://storybook.js.org/) - build your UI web components in isolation

#### Frontend UI

- [Tailwind](https://chakra-ui.com/) - UI library that lets you create beautiful interfaces quickly
- [Framer Motion](https://www.framer.com/motion/) - create beautiful motion animations ([compatible with ChakraUI](https://chakra-ui.com/getting-started/with-framer))

### Backend

- [Fastify](https://www.fastify.io/) - fast web framework for NodeJS
- [Prisma](https://www.prisma.io/) - new generation ORM for working with relational databases
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference
- [dotenv](https://www.npmjs.com/package/dotenv) - to load your configs from an .env file
- [env-var](https://www.npmjs.com/package/env-var) - validate and sanitize your environmental variables

### Shared libraries

- [tRPC](https://trpc.io/) - Remote Procedure Calls for your TypeScript applications. Move faster by removing the need of a traditional API-layer.
- [NX](https://nx.dev/) - build system with first class monorepo support and powerful integrations
- [Jest](https://jestjs.io/) - testing framework
- [Eslint](https://eslint.org/) - static code analysis for identifying problematic patterns found in your code

## Starting the app

- Clone the repository
- Copy `.env.example` and rename to `.env`
- `npm run docker:env` - setup the database (postgresql) in docker
- `npm install` - install dependencies
- `npm run migrate:dev` - run migrations to create tables
- `npm run backend:start` - run backend
- `npm run frontend:start` - run frontend

## Scripts

- `npm run frontend:storybook` - start storybook to develop components in isolation
- `npm run dep-graph` - see dependency graph
- For more commands check `package.json`
- To generate new apps in the monorepo, check out [NX documentation](https://nx.dev/packages/nx/documents/generate).
