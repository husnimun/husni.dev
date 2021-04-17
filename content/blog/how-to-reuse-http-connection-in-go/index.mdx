---
title: How to Reuse HTTP Connection in Go
date: "2021-04-07"
description: "Reuse HTTP Connection in Go"
---

Go’s standard HTTP client supports HTTP keep-alive, which keeps the TCP connection open to be reused for subsequent HTTP request.
You have to read the body request to completion before you close it as stated in [Response.Body documentation](https://golang.org/src/net/http/response.go#L59).
If you close the request body when it’s not fully read, the TCP connection can’t be reused because there’s still data left on the network to be read. Thus, the TCP connection will be closed.

Let's take a look at the following program.
```go
package main

import (
	"net/http"
)

func main() {
	for i := 0; i < 10; i++ {
		res, err := http.Get("http://127.0.0.1:8080")
		if err != nil {
			panic(err)
		}

		res.Body.Close()
	}
}
```

It's a simple program that tries to connect to a local web server on my local machine. It closes the response body without reading it.
We can monitor the network activity with netstat to see how many TCP connections are open while running the program.
```
netstat -atn | grep 8080
tcp        0      0 127.0.0.1:44390         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44374         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44380         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44392         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44388         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44384         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44378         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44386         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44382         127.0.0.1:8080          TIME_WAIT
tcp        0      0 127.0.0.1:44376         127.0.0.1:8080          TIME_WAIT
tcp6       0      0 :::8080                 :::*                    LISTEN
```
As expected, there are multiple open TCP connections.


Now, modify the program as follows: the program now reads all of the request body before closing it.
```go
package main

import (
	"io"
	"io/ioutil"
	"net/http"
)

func main() {
	for i := 0; i < 10; i++ {
		res, err := http.Get("http://127.0.0.1:8080")
		if err != nil {
			panic(err)
		}

		io.Copy(ioutil.Discard, res.Body)
		res.Body.Close()
	}
}
```

Run netstat to see how many TCP connections are open.
```
netstat -atn | grep 8080
tcp        0      0 127.0.0.1:44332         127.0.0.1:8080          TIME_WAIT
tcp6       0      0 :::8080                 :::*                    LISTEN
```
You'll see that there's only one TCP connections while running the program.
That means the program successfully reuses the same TCP connection.


You should fully read the response body before you close it to ensure that the TCP connection is reused.
By reusing the same TCP connection, we can avoid the overhead in establishing a new TCP connection, thus providing a significant performance to a program that makes a lot of HTTP requests.
If you don't really need the request body, you can limit the reading with `io.CopyN` in case the the other end of a connection sends you unwanted large streams of data.