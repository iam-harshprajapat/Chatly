import Redis from "ioredis";
import logger from "thirtyfour";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    logger.warn(`🔄 Redis retry attempt #${times}, reconnecting in ${delay}ms`);
    return delay;
  },
});

redis.on("connect", () => {
  logger.success("🔗 Redis connected successfully");
});

redis.on("error", (err) => {
  logger.error("❌ Redis connection error:", err);
});

export default redis;
