import 'dotenv/config';
import { GraphQLServer } from 'graphql-yoga';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Link from './resolvers/Link';
import Vote from './resolvers/Vote';

import database from './database';
import pubsubConfig from './config/pubsub';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const pubsub = new RedisPubSub(pubsubConfig);
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    database: database.connection.models,
    pubsub,
  }),
  cacheControl: true,
});

server.start(({ port }) => {
  console.log(`Server is running at http://localhost:${port}`);
});
