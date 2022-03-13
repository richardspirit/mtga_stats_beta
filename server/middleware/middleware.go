package middleware

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"strconv"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func opendb() *sql.DB {
	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/mtga?parseTime=true")
	// if there is an error opening the connection, handle it
	if err != nil {
		panic(err.Error())
	}
	return db
}

func Drank(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := drank()
	json.NewEncoder(w).Encode(payload)
}

func GameCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := gameCount()
	json.NewEncoder(w).Encode(payload)
}

func ViewDecks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := viewDecks()
	json.NewEncoder(w).Encode(payload)
}

func TopTen(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := topTen()
	json.NewEncoder(w).Encode(payload)
}

func WinPerc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := winPerc()
	json.NewEncoder(w).Encode(payload)
}

func Favorites(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := favorites()
	json.NewEncoder(w).Encode(payload)
}

func drank() []string {
	// Open up our database connection.
	db := opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	var (
		deckname    string
		wins        int
		loses       int
		ranking     float32
		rkquery_all string
	)

	rkquery_all = "SELECT deck, ranking, wins, loses FROM mtga.rankings WHERE deleted IS NULL"

	results, err := db.Query(rkquery_all)
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var finalresult []string
	for results.Next() {
		//var records Records
		// for each row, scan the result into our deck composite object
		err = results.Scan(&deckname, &ranking, &wins, &loses)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		frank := fmt.Sprintf("%f", ranking)
		frank = frank[2:6]
		frank = fmt.Sprintf("%0s", frank)
		fwins := fmt.Sprintf("%0s", strconv.Itoa(wins))
		floses := fmt.Sprintf("%0s", strconv.Itoa(loses))
		finalrecord := fmt.Sprint(frank + "|" + deckname + "|" + fwins + "|" + floses)
		finalresult = append(finalresult, finalrecord)
	}
	return finalresult
}

func gameCount() []string {
	db := opendb()
	// executing
	defer db.Close()

	var (
		deckname string
		count    int
		ctquery  string
	)

	ctquery = "SELECT deck, results AS Count FROM mtga.game_count WHERE deleted IS NULL ORDER BY results DESC"
	results, err := db.Query(ctquery)
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var finalresult []string
	for results.Next() {
		err = results.Scan(&deckname, &count)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		fdeck := fmt.Sprintf("%0s", deckname)
		finalcount := fmt.Sprint(fdeck + "|" + strconv.Itoa(count))
		finalresult = append(finalresult, finalcount)
	}
	return finalresult
}

func viewDecks() []string {
	// Open up our database connection.
	db := opendb()
	defer db.Close()

	vquery_all := "SELECT name, colors, date_entered, favorite, max_streak FROM mtga.decks ORDER BY name"
	results, err := db.Query(vquery_all)
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var count int
	var finalresult []string
	for results.Next() {
		var deck models.Deck
		count++
		// for each row, scan the result into our deck composite object
		err = results.Scan(&deck.Name, &deck.Colors, &deck.Date_Entered, &deck.Favorite, &deck.Max_Streak)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}

		// and then print out the tag's Name attribute
		mstreak := deck.Max_Streak
		var fav string
		if deck.Favorite == 0 {
			fav = fmt.Sprintf("%0s", "Yes")
		} else {
			fav = fmt.Sprintf("%0s", "No")
		}

		//format strings to be more readable
		fcount := fmt.Sprintf("%0s: ", strconv.Itoa(count))
		//deck.Name = fmt.Sprintf("%0s", deck.Name)
		//deck.Colors = fmt.Sprintf("%0s", deck.Colors)
		fdate := fmt.Sprintf("%0s", deck.Date_Entered.Format("2006-01-02"))
		fmstreak := fmt.Sprintf("%0s", strconv.Itoa(mstreak))
		finalrecord := fmt.Sprint(fcount + "|" + deck.Name + "|" + deck.Colors + "|" + fdate + "|" + fav + "|" + fmstreak)
		finalresult = append(finalresult, finalrecord)
	}
	return finalresult
}

func topTen() []string {
	// Open up our database connection.
	db := opendb()
	defer db.Close()

	results, err := db.Query("SELECT deck, ranking, wins, loses FROM mtga.topten")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var num int
	var finalresult []string
	for results.Next() {
		var (
			name    string
			wins    int
			loses   int
			ranking float64
		)
		num++
		// for each row, scan the result into our deck composite object
		err = results.Scan(&name, &ranking, &wins, &loses)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}

		frank := fmt.Sprintf("%f", ranking)
		frank = frank[2:6]
		if ranking == 1 {
			frank = "100"
		}

		fnum := fmt.Sprintf("%s:", strconv.Itoa(num))
		finalrecord := fnum + "|" + name + "|" + frank + "|" + strconv.Itoa(wins) + "|" + strconv.Itoa(loses)
		finalresult = append(finalresult, finalrecord)
	}
	return finalresult
}

func winPerc() []string {
	// Open up our database connection.
	db := opendb()
	defer db.Close()
	var (
		deckname string
		pct      float32
		count    int
		games    int
		pct_all  string
	)

	pct_all = "SELECT deck,win_pct,win_count,games FROM mtga.win_percentage WHERE deck IN (SELECT name FROM mtga.decks)"

	results, err := db.Query(pct_all)
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var finalresult []string
	for results.Next() {
		err = results.Scan(&deckname, &pct, &count, &games)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		fpct := fmt.Sprintf("%f", pct)
		fpct = fpct[2:4]
		if pct == 1 {
			fpct = "100%"
		} else {
			fpct = fpct + "%"
		}
		finalprint := fmt.Sprint(deckname + "|" + fpct + "|" + strconv.Itoa(count) + "|" + strconv.Itoa(games))
		finalresult = append(finalresult, finalprint)
	}
	return finalresult
}

func favorites() []string {
	// Open up our database connection.
	db := opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	var (
		deck         string
		date_entered time.Time
		wins         int
		loses        int
	)

	results, err := db.Query("SELECT name, date_entered, wins, loses FROM mtga.decks d JOIN record r ON d.name = r.deck WHERE favorite = 0")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	var finalresult []string
	for results.Next() {
		// for each row, scan the result into our deck composite object
		err = results.Scan(&deck, &date_entered, &wins, &loses)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		//format strings to be more readable
		//deck = fmt.Sprintf("%-25s", deck)
		//fdate := fmt.Sprintf("%s", date_entered.Format("2006-01-02"))
		//fwins := fmt.Sprintf("%-10s", strconv.Itoa(wins))
		finalrecord := fmt.Sprint(deck + "|" + date_entered.Format("2006-01-02") + "|" + strconv.Itoa(wins) + "|" + strconv.Itoa(loses))
		finalresult = append(finalresult, finalrecord)
	}
	return finalresult
}
