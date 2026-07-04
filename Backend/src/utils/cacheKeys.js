const CACHE_KEYS = {
  USERS_ALL: "users:all",
  USER_BY_ID: (id) => `user:${id}`,
};

module.exports = CACHE_KEYS;