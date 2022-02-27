import RedisClient from "./BasicStore";


const SocketStore = {
  hashSet: "sockMap",

  async get(key) {
    return RedisClient.hget(this.hashSet, key);
  },

  async set(key, value) {
    return RedisClient.hset(this.hashSet, key, value);
  },

  async del(key) {
    return RedisClient.hdel(this.hashSet, key);
  }
}

export default SocketStore;
