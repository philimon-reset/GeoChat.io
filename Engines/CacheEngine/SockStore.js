import RedisClient from "./BasicStore";


class SocketStore {
  static hashSet = "sockMap";

  static async get(key) {
    return RedisClient.hget(hashSet, key);
  }

  static async set(key, value) {
    return RedisClient.hset(hashSet, key, value);
  }
}

export default SocketStore;
