# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

> Please make sure you're using NodeJS version as specified on `.nvmrc` file. You can install it via [Node Version Manager - AKA NVM](https://github.com/nvm-sh/nvm)

The applied refactor is mainly based on few things:

- Since it's a refactor, it should keep feature parity. Saying that, it means there's some performance degradation when using `JSON.stringify()` when event is a string. It's just unnecessary and this method is quite slow to be executed in these scenarios

I applied few rules based on KISS, so that `generateCryptoHash` is wrapping the logic around crypto hash usage inside this method. Also, `MAX_PARTITION_KEY_LENGTH` is exported to be used on the tests. So that, the automation can make sure that `deterministicPartitionKey` output is respecting the allowed partition key length

Besides that, the code coverage is in a good state, the tests are describing the business logic instead of code internals and it's passing in all the main scenarios around `deterministicPartitionKey` logic. It also means that, even though the refactor might not be perfect, the unit tests are now documenting the code's behaviour by covering the main paths related to the feature itself.
