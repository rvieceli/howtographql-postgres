import Redis from 'ioredis';

const options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_POST,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const publisher = new Redis(options);
const subscriber = new Redis(options);

export default {
  publisher,
  subscriber,
};
