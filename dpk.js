const crypto = require('crypto');

const MAX_PARTITION_KEY_LENGTH = 256;
const TRIVIAL_PARTITION_KEY = '0';
const DEFAULT_HASH_ALGORITHM = 'sha3-512';

/**
 * Generates a CryptoHash based on the algorithm to be hashed
 * @param {*} value string to be hashed
 * @param {string} algorithm hashing algorithm to use (default: 'sha3-512')
 * @returns hashed value using the specified algorithm in hex
 */
const generateCryptoHash = (value, algorithm = DEFAULT_HASH_ALGORITHM) =>
  crypto.createHash(algorithm).update(value).digest('hex');

/**
 * Generates a deterministic partition key based on the given event
 * @param {*} event event object to generate partition key from
 * @returns partition key string
 */
const deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let partitionKey;
  if (event.partitionKey) {
    partitionKey =
      typeof event.partitionKey !== 'string'
        ? JSON.stringify(event.partitionKey)
        : event.partitionKey;
  } else {
    partitionKey = generateCryptoHash(JSON.stringify(event));
  }

  return partitionKey.length > MAX_PARTITION_KEY_LENGTH
    ? generateCryptoHash(partitionKey)
    : partitionKey;
};

module.exports = {
  MAX_PARTITION_KEY_LENGTH,
  deterministicPartitionKey,
  generateCryptoHash,
};
