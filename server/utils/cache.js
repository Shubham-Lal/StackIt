const NodeCache = require('node-cache');

const viewCache = new NodeCache({ stdTTL: 86400, checkperiod: 60 });

viewCache.on('expired', (key, value) => {
    console.log(`[Cache expired] Key: ${key}`);
});

viewCache.on('del', (key, value) => {
    console.log(`[Cache deleted] Key: ${key}`);
});

module.exports = viewCache;