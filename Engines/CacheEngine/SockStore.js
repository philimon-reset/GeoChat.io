import RedisClient from "./BasicStore";


const SocketStore = {
  hashSet: "sockMap",
  countSet: "sockCount",

  async get(key) {
    return RedisClient.hget(this.hashSet, key);
  },

  async set(key, value) {
    return RedisClient.hset(this.hashSet, key, value);
  },

  async del(key) {
    return RedisClient.hdel(this.hashSet, key);
  },

  async getAll() {
    return RedisClient.hgetall(this.hashSet);
  },

  async incrCount(key) {
    if(await RedisClient.hget(this.countSet, key)) {
      await RedisClient.hincrby(this.countSet, key, 1);
    } else {
      await RedisClient.hset(this.countSet, key, 1);
    }
  },

  async decrCount(key) {
    await RedisClient.hincrby(this.countSet, key, -1);
  },

  async getCount(key) {
    return RedisClient.hget(this.countSet, key);
  },

  async getNearChannel(key) {
    const raw = await this.getAll();
    for (let k in raw) {
      if (raw[k] == key) {
        return raw[k];
      }
    }
    return null;
  }
}

export default SocketStore;
