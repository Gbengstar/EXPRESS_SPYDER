import { createClient } from 'redis';

const client = createClient();
export const redisCaller = async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.on('connect', () => console.log('redis connected!'));

  await client.connect();

  //   await client.set('key', 'value');
  //   const value = await client.get('key');
};

export { client as RedisClient };
