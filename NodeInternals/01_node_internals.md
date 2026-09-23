## main js thread

-for normal app JS executes on one main JS thread

## v8 engine

- parse JS
- executes JS
- manage call stack
- manage heap memory
- perform garbage collection

## node js core apis

- fs
- http
- path
- buffers
- process
- timers

-- most of these core apis are written in js

## c++ bindings

- it lets js apis connect to the native functionalities
- js code to communicate with
- libuv
- os apis
- native libraries

## libuv

- native library used by node js
- provides
- event loop
- worker thread pool
- timers
- async i/o handling

## os

- is going to do low level work
- reading files
- writing files
- tracking time

# Diagram:

JS Code -> Node.js core apis -> C++ bindings -> libuv(C library) -> OS & V8 Engine
JS Code -> V8 Engine

-- V8 Engine parses and executes JS Code, but JS core modules/ apis are written which cannot communicate with OS directly so these connect with libuv through C++ bindings, the libuv can communicate with the native funtionalities, like i/o tasks, fs, os, etc
