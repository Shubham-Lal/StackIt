const NodeCache = require('node-cache');
const viewCache = new NodeCache({ stdTTL: 86400 });

module.exports = viewCache;