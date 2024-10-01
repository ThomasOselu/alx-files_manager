// utils/redis.js

import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Handle Redis errors
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    this.client.connect();
  }

  // Method to check if the Redis connection is alive
  isAlive() {
    return this.client.isOpen;
  }

  // Method to get a value from Redis by key
  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error(`Error getting key ${key}:`, err);
      return null;
    }
  }

  // Method to set a value in Redis with an expiration time
  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (err) {
      console.error(`Error setting key ${key}:`, err);
    }
  }

  // Method to delete a key from Redis
  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}:`, err);
    }
  }
}

// Exporting an instance of the RedisClient
const redisClient = new RedisClient();
export default redisClient;

