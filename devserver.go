package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

var index = `<html>
<head>
	<title>Devserver</title>
</head>
<body>
	<div id="app"></div>
	<script type="module" src="./main.js"></script>
</body>
</html>
`

func main() {
	// root := flag.String("root", "", "The root path that should be served (Required)")
	port := flag.Int("port", 3000, "The port where it should be served")
	flag.Parse()

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		if req.URL.Path == "/" {
			fmt.Fprint(res, index)
			return
		}
		http.ServeFile(res, req, req.URL.Path[1:])
	})

	server := http.Server{
		Handler: mux,
		Addr:    fmt.Sprintf(":%v", *port),
	}

	fmt.Printf("\n🌍 Starting server at %s\n", fmt.Sprintf("http://localhost:%d/", *port))
	log.Fatal(server.ListenAndServe())
}
