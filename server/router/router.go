package router

import (
	"server/middleware"

	"github.com/gorilla/mux"
)

//Router exported
func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/api/rank", middleware.Drank).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/count", middleware.GameCount).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/viewdecks", middleware.ViewDecks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/topten", middleware.TopTen).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/winpercent", middleware.WinPerc).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/favorites", middleware.Favorites).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/deckname", middleware.DeckName).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/deckdetails", middleware.DeckDetails).Methods("GET", "OPTIONS")
	return router
}
