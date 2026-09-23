## libuv native library used by node

- help nodejs to handle async operations across all os
- manage event loop
- worker thread pool
- timers
- async i/o operations

v8 engine does not provide:

- fs operaitons
- network socket handling
- timers
- general event loop for node js apis

# event loop checks for:

- completed i/o operations
- timers -> if some are in ready state
- pending callbacks
- socket avtivity

# thread pool:

- libuv provides a shared worker thread pool
- this is only used by those operations that can not be handled efficiently
- ex - many fs operations, cryptographic operations, compression

# timers:

- libuv helps nodejs track those timers and determine when a timer is eligible to execute
- helps in non blocking operations
