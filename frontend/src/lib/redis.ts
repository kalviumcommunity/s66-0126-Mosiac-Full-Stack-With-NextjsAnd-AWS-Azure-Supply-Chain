import Redis from 'ioredis';

const getRedisUrl = (): string => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error('REDIS_URL is not defined');
};

class RedisClient {
  private static instance: Redis | null = null;
  private static connecting = false;

  static getInstance(): Redis {
    if (!RedisClient.instance && !RedisClient.connecting) {
      RedisClient.connecting = true;
      
      try {
        RedisClient.instance = new Redis(getRedisUrl(), {
          maxRetriesPerRequest: 3,
          retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
          reconnectOnError(err) {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
              return true;
            }
            return false;
          },
        });

        RedisClient.instance.on('error', (error) => {
          console.error('Redis Client Error:', error);
        });

        RedisClient.instance.on('connect', () => {
          console.log('✅ Redis connected successfully');
        });

        RedisClient.instance.on('ready', () => {
          console.log('✅ Redis is ready to accept commands');
        });

      } catch (error) {
        console.error('Failed to create Redis instance:', error);
        RedisClient.instance = null;
      } finally {
        RedisClient.connecting = false;
      }
    }

    if (!RedisClient.instance) {
      throw new Error('Redis instance could not be created');
    }

    return RedisClient.instance;
  }

  static async disconnect(): Promise<void> {
    if (RedisClient.instance) {
      await RedisClient.instance.quit();
      RedisClient.instance = null;
    }
  }
}

export const redis = RedisClient.getInstance();

// Cache utility functions
export class CacheService {
  private static getTTL(type: 'short' | 'medium' | 'long'): number {
    const ttls = {
      short: parseInt(process.env.CACHE_TTL_SHORT || '300'),
      medium: parseInt(process.env.CACHE_TTL_MEDIUM || '1800'),
      long: parseInt(process.env.CACHE_TTL_LONG || '3600'),
    };
    return ttls[type];
  }

  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  static async set(
    key: string,
    value: any,
    ttl: number | 'short' | 'medium' | 'long' = 'medium'
  ): Promise<boolean> {
    try {
      const ttlSeconds = typeof ttl === 'number' ? ttl : this.getTTL(ttl);
      await redis.setex(key, ttlSeconds, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
      return false;
    }
  }

  static async del(key: string): Promise<boolean> {
    try {
      await redis.del(key);
      return true;
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error);
      return false;
    }
  }

  static async delPattern(pattern: string): Promise<number> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return keys.length;
    } catch (error) {
      console.error(`Cache delete pattern error for ${pattern}:`, error);
      return 0;
    }
  }

  static async invalidate(resource: string, id?: string): Promise<void> {
    const patterns = [
      `${resource}:*`,
      id ? `${resource}:${id}` : null,
      `${resource}:list:*`,
    ].filter(Boolean) as string[];

    await Promise.all(patterns.map((pattern) => this.delPattern(pattern)));
  }
}

export default redis;
