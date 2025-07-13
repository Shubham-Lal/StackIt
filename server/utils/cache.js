const { createCache } = require('cache-manager');

const viewCache = createCache({
  ttl: 60 * 60 * 24
});

module.exports = viewCache;