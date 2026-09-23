- js runs on one main thread but it cannot utilize multi core cpus
- cluster module helps by starting multple nodejs worker threads
- each worker thread has:
  its own nodejs runtime
  its own v8 engine
  its own event loop
  its own main js thread
  its own memory

- there is a primary process which can start
  worker 1 - using cpu 1
  worker 2 - using cpu 2
  ans so on
- these can share a single port
- requests can be distributed among the threads
