package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"
)

type Catch struct {
	ID        int    `json:"id,omitempty"`
	Address   string `json:"address,omitempty"`
	Body      string `json:"body,omitempty"`
	Method    string `json:"method,omitempty"`
	CreatedAt string `json:"created_at,omitempty"`
}

type Catches []Catch

var catches = Catches{}

func main() {
	http.HandleFunc("/history", historyHandler)
	http.HandleFunc("/", catchHandler)
	http.ListenAndServe(":8090", nil)
}

func catchHandler(w http.ResponseWriter, r *http.Request) {
	catchRequest(r)
}

func historyHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	jsonResp, err := json.Marshal(catches)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	return
}

func catchRequest(r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Println(err)
	}

	catches = append(catches, Catch{
		ID:        len(catches) + 1,
		Address:   r.URL.String(),
		Body:      string(body),
		Method:    r.Method,
		CreatedAt: time.Now().Local().Format("Jan 2 15:04:05"),
	})
}
