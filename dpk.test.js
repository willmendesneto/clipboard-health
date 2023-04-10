const {
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH,
  generateCryptoHash,
} = require('./dpk');

describe('deterministicPartitionKey', () => {
  it("should return '0' if input receive falsy values", () => {
    expect(deterministicPartitionKey(null)).toBe('0');
    expect(deterministicPartitionKey(undefined)).toBe('0');
    expect(deterministicPartitionKey()).toBe('0');
  });

  it('should return hashed if input event does NOT have partitionKey as string', () => {
    const data = { hahaha: true };
    expect(deterministicPartitionKey(data)).toBe(generateCryptoHash(JSON.stringify(data)));
  });

  it('should return hashed if input event is not a falsy value', () => {
    expect(deterministicPartitionKey('something')).toBe(
      generateCryptoHash(JSON.stringify('something')),
    );
    expect(deterministicPartitionKey([])).toBe(generateCryptoHash(JSON.stringify([])));
    expect(deterministicPartitionKey({})).toBe(generateCryptoHash(JSON.stringify({})));
    expect(deterministicPartitionKey(true)).toBe(generateCryptoHash(JSON.stringify(true)));
  });

  it('should return `partitionKey` when information exists on event input as string', () => {
    const partitionKey = '12345';
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(partitionKey);
  });

  it('should return `partitionKey` as string if input value type is different than string', () => {
    expect(deterministicPartitionKey({ partitionKey: 123 })).toBe(JSON.stringify(123));
    expect(deterministicPartitionKey({ partitionKey: [] })).toBe(JSON.stringify([]));
    expect(deterministicPartitionKey({ partitionKey: {} })).toBe(JSON.stringify({}));
    expect(deterministicPartitionKey({ partitionKey: true })).toBe(JSON.stringify(true));
  });

  it('should return a hashed string if receives a typed array', () => {
    const data = new Buffer([]);

    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(generateCryptoHash(JSON.stringify(data)));
  });

  it('should return value with no more than allowed maximum partition key length', () => {
    const partitionKey = '1'.repeat(15000);
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey.length).toBe(128);
    expect(trivialKey.length > MAX_PARTITION_KEY_LENGTH).toBe(false);
    expect(trivialKey).toBe(generateCryptoHash(partitionKey));
  });
});
