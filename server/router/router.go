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
	router.HandleFunc("/api/newdeck", middleware.NewDeck).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/newgame", middleware.NewGame).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/anal/gamesbyday", middleware.GameByDay).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/anal/gamesbydayweek", middleware.GameByDayWeek).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/anal/gamesbyreason", middleware.GamesByReason).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/anal/gamesbytime", middleware.GamesByTime).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/anal/gamesbylevel", middleware.GamesByLevel).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/anal/deleterecommend", middleware.DeleteRecommend).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/anal/deckbycards", middleware.DecksByCardTotals).Methods("GET", "OPTIONS")
	return router
}
