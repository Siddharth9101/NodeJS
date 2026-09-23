blocking -> the js code stops executing/ the main js thread waits, until the current work finishes - sync operations
ex - readFileSync, writeFileSync, etc

non-blocking -> the main thread delegrate other work and continues the executing/ running of the main js thread - async operations, the mainjs thread executes the delegated work when it is ready.
ex - i/o/fs operations, callbacks, timers, readFile, writeFile etc
