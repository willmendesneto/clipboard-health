const crypto = require('crypto');

/**
 * Generates a CryptoHash based on the algorithm to be hashed
 * @param {*} value string to be hashed
 * @returns hashed value using algorithm `sha3-512` in hex
 */
exports.generateCryptoHash = (value) => crypto.createHash('sha3-512').update(value).digest('hex');

exports.MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';

  if (typeof event === 'undefined' || event === null) {
    return TRIVIAL_PARTITION_KEY;
  }

  let partitionKey;
  if (event.partitionKey) {
    partitionKey =
      typeof event.partitionKey !== 'string'
        ? JSON.stringify(event.partitionKey)
        : event.partitionKey;
  } else {
    partitionKey = exports.generateCryptoHash(JSON.stringify(event));
  }

  if (partitionKey.length > exports.MAX_PARTITION_KEY_LENGTH) {
    partitionKey = exports.generateCryptoHash(partitionKey);
  }

  return partitionKey;
};
