package middleware

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"server/components/processing"
	"server/models"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

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

func DeckName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := deckName()
	json.NewEncoder(w).Encode(payload)
}

func Favorites(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := favorites()
	json.NewEncoder(w).Encode(payload)
}

func DeckDetails(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := deckDetails()
	json.NewEncoder(w).Encode(payload)
}

func NewDeck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var d models.Deck
	_ = json.NewDecoder(r.Body).Decode(&d)
	error := newDeck(d)
	json.NewEncoder(w).Encode(error)
}

func NewGame(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var g models.Game
	_ = json.NewDecoder(r.Body).Decode(&g)
	error := newGame(g)
	json.NewEncoder(w).Encode(error)
}

func GameByDay(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var anal models.Anal
	_ = json.NewDecoder(r.Body).Decode(&anal)
	payload := gameByDay(anal.Deck, anal.Winsloses)
	json.NewEncoder(w).Encode(payload)
}

func GameByDayWeek(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var anal models.Anal
	_ = json.NewDecoder(r.Body).Decode(&anal)
	payload := gameByDayWeek()
	json.NewEncoder(w).Encode(payload)
}

func GamesByReason(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := gamesByReason()
	json.NewEncoder(w).Encode(payload)
}

func GamesByTime(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := gamesByTime()
	json.NewEncoder(w).Encode(payload)
}

func GamesByLevel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := gamesByLevel()
	json.NewEncoder(w).Encode(payload)
}

func DeleteRecommend(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := deleteRecommend()
	json.NewEncoder(w).Encode(payload)
}

func DecksByCardTotals(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := decksByCardTotals()
	json.NewEncoder(w).Encode(payload)
}

func ImportSet(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var file string
	_ = json.NewDecoder(r.Body).Decode(&file)
	error := importSet(file)
	json.NewEncoder(w).Encode(error)
}

func ImportDeck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var fileDeck string
	_ = json.NewDecoder(r.Body).Decode(&fileDeck)
	error := importDeck(fileDeck)
	json.NewEncoder(w).Encode(error)
}

func UpdateDeck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var d models.Deck
	_ = json.NewDecoder(r.Body).Decode(&d)
	error := updateDeck(d)
	json.NewEncoder(w).Encode(error)
}

func DeleteDeck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var d string
	_ = json.NewDecoder(r.Body).Decode(&d)
	error := deleteDeck(d)
	json.NewEncoder(w).Encode(error)
}

func drank() []string {
	// Open up our database connection.
	db := processing.Opendb()
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

	rkquery_all = "SELECT deck, ranking, wins, loses FROM rankings WHERE deleted IS NULL"

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
	db := processing.Opendb()
	// executing
	defer db.Close()

	var (
		deckname string
		count    int
		ctquery  string
	)

	ctquery = "SELECT deck, results AS Count FROM game_count WHERE deleted IS NULL ORDER BY results DESC"
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
	db := processing.Opendb()
	defer db.Close()

	vquery_all := "SELECT name, colors, date_entered, favorite, max_streak FROM decks ORDER BY name"
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
		fdate := fmt.Sprintf("%0s", deck.Date_Entered.Format("2006-01-02"))
		fmstreak := fmt.Sprintf("%0s", strconv.Itoa(mstreak))
		finalrecord := fmt.Sprint(fcount + "|" + deck.Name + "|" + deck.Colors + "|" + fdate + "|" + fav + "|" + fmstreak)
		finalresult = append(finalresult, finalrecord)
	}
	return finalresult
}

func topTen() []string {
	// Open up our database connection.
	db := processing.Opendb()
	defer db.Close()

	results, err := db.Query("SELECT deck, ranking, wins, loses FROM topten")
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
	db := processing.Opendb()
	defer db.Close()
	var (
		deckname string
		pct      float32
		count    int
		games    int
		pct_all  string
	)

	pct_all = "SELECT deck,win_pct,win_count,games FROM win_percentage WHERE deck IN (SELECT name FROM decks)"

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
	db := processing.Opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	var (
		deck         string
		date_entered time.Time
		wins         int
		loses        int
	)

	results, err := db.Query("SELECT name, date_entered, wins, loses FROM decks d JOIN record r ON d.name = r.deck WHERE favorite = 0")
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
		finalrecord := fmt.Sprint(deck + "|" + date_entered.Format("2006-01-02") + "|" + strconv.Itoa(wins) + "|" + strconv.Itoa(loses))
		finalresult = append(finalresult, finalrecord)
	}
	return finalresult
}

func deckName() []string {
	//open database
	db := processing.Opendb()
	defer db.Close()

	var deckname string

	results, err := db.Query("SELECT name FROM decks")
	if err != nil {
		panic(err.Error())
	}
	var finalresult []string
	for results.Next() {
		err = results.Scan(&deckname)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		finalresult = append(finalresult, deckname)
	}
	return finalresult
}

func deckDetails() []string {
	// Open up our database connection.
	db := processing.Opendb()
	defer db.Close()

	var (
		vquery string
	)

	var d models.Deck

	vquery = "SELECT name, colors, date_entered, favorite, max_streak, cur_streak, numcards, numlands, numspells, numcreatures, numenchant, numartifacts FROM decks"
	results, err := db.Query(vquery)
	if err != nil {
		panic(err.Error())
	}
	var finalresults []string
	for results.Next() {
		err = results.Scan(&d.Name, &d.Colors, &d.Date_Entered, &d.Favorite, &d.Max_Streak, &d.Cur_Streak,
			&d.Num_Cards, &d.Num_Lands, &d.Num_Spells, &d.Num_Creat, &d.Num_Enchant, &d.Num_Art)
		if err != nil {
			panic(err.Error())
		}
		ffav := d.Favorite
		var sfav string
		if ffav == 0 {
			sfav = "Yes"
		} else {
			sfav = "No"
		}
		finalrecord := fmt.Sprint(d.Name + "|" + strconv.Itoa(d.Num_Cards) + "|" + strconv.Itoa(d.Num_Creat) + "|" + strconv.Itoa(d.Max_Streak) + "|" + d.Colors + "|" + strconv.Itoa(d.Num_Lands) + "|" + strconv.Itoa(d.Num_Enchant) + "|" + strconv.Itoa(d.Cur_Streak) + "|" + d.Date_Entered.Format("01-02-2006") + "|" + strconv.Itoa(d.Num_Spells) + "|" + strconv.Itoa(d.Num_Art) + "|" + sfav)
		finalresults = append(finalresults, finalrecord)
	}
	return finalresults
}

func newDeck(d models.Deck) error {

	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()
	d.Name = strings.TrimSpace(d.Name)
	// perform a db.Query insert
	query := "INSERT INTO decks(name, colors, favorite, numcards, numlands, numspells, numcreatures, numenchant, numartifacts) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)"
	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		log.Printf("Error %s when preparing SQL statement", err)
		panic(err.Error())
	}
	defer stmt.Close()
	res, err := stmt.ExecContext(ctx, d.Name, d.Colors, d.Favorite, d.Num_Cards, d.Num_Lands, d.Num_Spells, d.Num_Creat, d.Num_Enchant, d.Num_Art)
	if err != nil {
		log.Printf("Error %s when inserting row into deck table", err)
		panic(err.Error())
	}
	rows, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error %s when finding rows affected", err)
		panic(err.Error())
	}
	log.Printf("%d deck created ", rows)
	//fmt.Println("")
	//menu()
	return nil
}

func newGame(g models.Game) error {

	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	// perform a db.Query insert
	query := "INSERT INTO games(results, cause, deck, opponent, level, game_type) VALUES (?,?,?,?,?,?)"
	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		log.Printf("Error %s when preparing SQL statement", err)
		panic(err.Error())
	}
	defer stmt.Close()
	res, err := stmt.ExecContext(ctx, g.Results, g.Cause, g.Deck, g.Opponent, g.Level, g.GameType)
	if err != nil {
		log.Printf("Error %s when inserting row into deck table", err)
		panic(err.Error())
	}
	rows, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error %s when finding rows affected", err)
		panic(err.Error())
	}
	log.Printf("%d row added ", rows)
	//determin max and current streak
	processing.Streaks(g.Deck)
	//fmt.Println("")
	//menu()
	return nil
}

func gameByDay(d string, win_lose string) []string {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	var (
		deckname           string
		max_win            int
		max_lose           int
		day                string
		win_day_query      string
		win_day_all_query  string
		lose_day_query     string
		lose_day_all_query string
		finalresults       []string
	)

	win_day_query = "SELECT deck, MAX(win_count) as max_win, day_of_week FROM wins_by_day WHERE deck=? AND deck IN (SELECT name FROM decks) GROUP BY deck, day_of_week ORDER BY win_count DESC LIMIT 1"
	win_day_all_query = "SELECT deck, win_count, day_of_week FROM most_wbd WHERE deck IN (SELECT name FROM decks) ORDER BY FIELD(day_of_week , 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'), win_count DESC;"
	lose_day_query = "SELECT deck, MAX(lose_count) as max_loses, day_of_week FROM loses_by_day WHERE deck=? AND deck IN (SELECT name FROM decks) GROUP BY deck, day_of_week ORDER BY lose_count DESC LIMIT 1"
	lose_day_all_query = "SELECT deck, lose_count, day_of_week FROM most_lbd WHERE deck IN (SELECT name FROM decks) ORDER BY FIELD(day_of_week , 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'), lose_count DESC"

	if d != "n" && win_lose == "win" {
		results := db.QueryRow(win_day_query, d)
		err := results.Scan(&deckname, &max_win, &day)
		if err != nil {
			if strings.Contains(err.Error(), "no rows in result set") {
				fmt.Println("No Games Recored for this Deck")
			} else {
				panic(err.Error())
			}
		}
		finalstring := fmt.Sprint(deckname + "|" + day + "|" + strconv.Itoa(max_win))
		finalresults = append(finalresults, finalstring)
	} else if d == "n" && win_lose == "win" {
		//println("Deck" + d + win_lose + "test")
		results, err := db.Query(win_day_all_query)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}

		for results.Next() {
			// for each row, scan the result into our deck composite object
			err = results.Scan(&deckname, &max_win, &day)
			if err != nil {
				panic(err.Error()) // proper error handling instead of panic in your app
			}
			finalstring := fmt.Sprint(deckname + "|" + day + "|" + strconv.Itoa(max_win))
			finalresults = append(finalresults, finalstring)
		}
	} else if d != "n" && win_lose == "lose" {
		results := db.QueryRow(lose_day_query, d)
		err := results.Scan(&deckname, &max_lose, &day)
		if err != nil {
			if strings.Contains(err.Error(), "no rows in result set") {
				fmt.Println("No Games Recored for this Deck")
			} else {
				panic(err.Error())
			}
		}
		finalstring := fmt.Sprint(deckname + "|" + day + "|" + strconv.Itoa(max_lose))
		finalresults = append(finalresults, finalstring)
	} else if d == "n" && win_lose == "lose" {
		results, err := db.Query(lose_day_all_query)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		for results.Next() {
			// for each row, scan the result into our deck composite object
			err = results.Scan(&deckname, &max_lose, &day)
			if err != nil {
				panic(err.Error()) // proper error handling instead of panic in your app
			}
			finalstring := fmt.Sprint(deckname + "|" + day + "|" + strconv.Itoa(max_lose))
			finalresults = append(finalresults, finalstring)
		}
	}
	return finalresults
}

func gameByDayWeek() []string {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	var (
		deckname     string
		week_day     string
		wins_loses   string
		w_count      int
		l_count      int
		finalresults []string
	)

	wins_loses = "SELECT w.day_of_week, w.deck, w.win_count, l.lose_count FROM wins_by_day w JOIN loses_by_day l ON w.deck = l.deck AND w.day_of_week = l.day_of_week"

	results, err := db.Query(wins_loses)
	if err != nil {
		if strings.Contains(err.Error(), "no rows in result set") {
			fmt.Println("No Wins Recorded for this Day")
		} else {
			panic(err.Error())
		}
	}
	for results.Next() {

		// for each row, scan the result into our deck composite object
		err = results.Scan(&week_day, &deckname, &w_count, &l_count)

		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}

		// and then print out the tag's Name attribute
		finalstring := fmt.Sprint(week_day + "|" + deckname + "|" + strconv.Itoa(w_count) + "|" + strconv.Itoa(l_count))
		finalresults = append(finalresults, finalstring)
	}
	return finalresults
}

func gamesByReason() []string {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	defer db.Close()

	var (
		cause        string
		deck         string
		rsn_query    string
		gameResults  int
		finalresults []string
		gmRes        string
	)

	rsn_query = "SELECT deck, cause, results FROM games WHERE deck IN (SELECT name FROM decks) ORDER BY deck"

	results, err := db.Query(rsn_query)
	if err != nil {
		if strings.Contains(err.Error(), "no rows in result set") {
			fmt.Println("No Games Recored for this Deck")
		} else {
			panic(err.Error())
		}
	}
	for results.Next() {
		// for each row, scan the result into our deck composite object
		err = results.Scan(&deck, &cause, &gameResults)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}

		if gameResults == 0 {
			gmRes = "Won"
		} else if gameResults == 1 {
			gmRes = "Lost"
		}
		// and then print out the tag's Name attribute
		finalstring := fmt.Sprint(deck + "|" + cause + "|" + gmRes)
		finalresults = append(finalresults, finalstring)
	}
	return finalresults
}

func gamesByTime() []string {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	defer db.Close()

	var (
		deck         string
		cause        string
		hour         string
		result       int
		tm_query     string
		gmRes        string
		finalresults []string
	)

	tm_query = "SELECT deck, cause, TIME(`Timestamp`), results AS playtime FROM games WHERE deck IN (SELECT name FROM decks) ORDER BY deck"
	results, err := db.Query(tm_query)

	if err != nil {
		if strings.Contains(err.Error(), "no rows in result set") {
			fmt.Println("No Games Recorded.")
		} else {
			panic(err.Error())
		}
	}

	for results.Next() {
		// for each row, scan the result into our deck composite object
		err = results.Scan(&deck, &cause, &hour, &result)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		if result == 0 {
			gmRes = "Won"
		} else if result == 1 {
			gmRes = "Lost"
		}

		layout1 := "03:04:05 PM"
		layout2 := "15:04:05"
		t, err := time.Parse(layout2, hour)
		if err != nil {
			fmt.Println(err)
		}

		fhour := fmt.Sprintf("%-25s", t.Format(layout1))
		finalstring := fmt.Sprint(deck + "|" + fhour + "|" + cause + "|" + gmRes)
		finalresults = append(finalresults, finalstring)
	}
	return finalresults
}

func gamesByLevel() []string {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	defer db.Close()

	var (
		deck         string
		level        string
		opp          string
		cause        string
		result       int
		gmRes        string
		lvl_query    string
		finalresults []string
	)

	lvl_query = "SELECT deck, opponent, `level`, cause, results FROM games WHERE deck IN (SELECT name FROM decks) ORDER BY deck"
	results, err := db.Query(lvl_query)

	if err != nil {
		if strings.Contains(err.Error(), "no rows in result set") {
			fmt.Println("No Games Recored for this Deck")
		} else {
			panic(err.Error())
		}
	}
	for results.Next() {
		// for each row, scan the result into our deck composite object
		err = results.Scan(&deck, &opp, &level, &cause, &result)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		if result == 0 {
			gmRes = "Won"
		} else if result == 1 {
			gmRes = "Lost"
		}

		finalstring := fmt.Sprint(deck + "|" + opp + "|" + level + "|" + cause + "|" + gmRes)
		finalresults = append(finalresults, finalstring)
	}
	return finalresults
}

func deleteRecommend() []string {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	defer db.Close()

	var (
		deck         string
		date_entered time.Time
		win_pct      float32
		win_count    int
		games        int
		finalresults []string
	)

	results, err := db.Query("SELECT name, date_entered, win_pct, win_count, games FROM decks d JOIN win_percentage wp ON d.name = wp.deck WHERE win_pct <= .40 ORDER BY games DESC, name")

	if err != nil {
		if strings.Contains(err.Error(), "no rows in result set") {
			fmt.Println("No Decks Recommended for Deleting")
		} else {
			panic(err.Error())
		}
	}
	for results.Next() {
		// for each row, scan the result into our deck composite object
		err = results.Scan(&deck, &date_entered, &win_pct, &win_count, &games)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		fdate := fmt.Sprintf("%0s", date_entered.Format("2006-01-02"))
		cwin_pct := fmt.Sprintf("%f", win_pct)
		cwin_pct = cwin_pct[2:4]
		fwin_pct := cwin_pct + "%"
		finalstring := fmt.Sprint(deck + "|" + fdate + "|" + fwin_pct + "|" + strconv.Itoa(win_count) + "|" + strconv.Itoa(games))
		finalresults = append(finalresults, finalstring)
	}
	return finalresults
}

func decksByCardTotals() []string {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	defer db.Close()

	var (
		cardtotal     int
		landtotal     int
		spelltotal    int
		creaturetotal int
		enchanttotal  int
		artifacttotal int
		win           int
		lose          int
		finalstring   string
		crd_query     string
		finalresults  []string
	)

	crd_query = "SELECT DISTINCT numcards, numlands, numspells, numcreatures, numenchant, numartifacts, r.wins, r.loses FROM decks d JOIN record r ON d.name = r.deck"

	results, err := db.Query(crd_query)
	if err != nil {
		if strings.Contains(err.Error(), "no rows in result set") {
			fmt.Println("No Games Recored for this Deck")
		} else {
			panic(err.Error())
		}
	}
	for results.Next() {
		// for each row, scan the result into our deck composite object
		err = results.Scan(&cardtotal, &landtotal, &spelltotal, &creaturetotal, &enchanttotal, &artifacttotal, &win, &lose)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		finalstring = fmt.Sprint(strconv.Itoa(cardtotal) + "|" + strconv.Itoa(landtotal) + "|" + strconv.Itoa(spelltotal) + "|" + strconv.Itoa(creaturetotal) + "|" + strconv.Itoa(enchanttotal) + "|" + strconv.Itoa(artifacttotal) + "|" + strconv.Itoa(win) + "|" + strconv.Itoa(lose))
		finalresults = append(finalresults, finalstring)
	}
	return finalresults
}

func importSet(fileName string) error {
	// Open up our database connection.
	db := processing.Opendb()
	//set max connections
	db.SetMaxOpenConns(1000)
	db.SetMaxIdleConns(1000)
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	dir, _ := os.UserHomeDir()
	//println(dir)
	//println("File name: " + fileName)
	dirFile := (dir + `\react_mtga\mtga_stats_beta\mtga_stats\server\AllSetFiles\` + fileName)
	//println(dirFile)

	sfile, err := os.Open(dirFile)
	if err != nil {
		fmt.Println(err)
	}
	defer sfile.Close()

	// read our opened jsonFile as a byte array.
	byteValue, _ := ioutil.ReadAll(sfile)

	var (
		cards models.Cards
		trows int
		//s       string
		setname string
	)

	json.Unmarshal(byteValue, &cards)

	/* 	results := db.QueryRow("SELECT DISTINCT set_code FROM sets WHERE set_code=?", cards.Cards[0].SetCode)
	   	err = results.Scan(&s)
	   	if err == nil {
	   		println("File has already been loaded: ", dirFile)
	   		return nil
	   	} */

	// we iterate through every user within our cards array
	for i := 0; i < len(cards.Cards); i++ {
		nresult := db.QueryRow("SELECT DISTINCT set_name FROM set_abbreviations WHERE set_abbrev=?", cards.Cards[i].SetCode)
		err = nresult.Scan(&setname)

		if err != nil {
			log.Println("Set Name is Missing")
		}
		//deal with arrays in json file
		var (
			colors     string
			types      string
			supertypes string
			subtypes   string
		)

		for _, s := range cards.Cards[i].Colors {
			colors = colors + s
		}
		for _, s := range cards.Cards[i].Subtypes {
			subtypes = subtypes + s
		}
		for _, s := range cards.Cards[i].Supertypes {
			supertypes = supertypes + s
		}
		for _, s := range cards.Cards[i].Types {
			types = types + s
		}
		if cards.Cards[i].Layout == "split" || cards.Cards[i].Layout == "adventure" || cards.Cards[i].Layout == "aftermath" {
			cards.Cards[i].ManaValue = cards.Cards[i].FaceManaValue
			cards.Cards[i].ConvertedMana = cards.Cards[i].FaceConvertedMana
		}
		//println(colors)
		// perform a db.Query insert
		upresult, err := db.Exec("INSERT INTO sets(set_name, card_name, colors, mana_cost, mana_colors, converted_mana_cost, set_number, card_text, type, sub_type, super_type, types, rarity, set_code, card_side) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			setname, cards.Cards[i].Name, colors, cards.Cards[i].ManaValue, cards.Cards[i].ManaCost, cards.Cards[i].ConvertedMana, cards.Cards[i].Number, cards.Cards[i].OriginalText, cards.Cards[i].Type, subtypes, supertypes, types, cards.Cards[i].Rarity, cards.Cards[i].SetCode, cards.Cards[i].Side)
		if err != nil {
			println(cards.Cards[i].Name)
			log.Printf("Error %s when inserting row into sets table", err)
			panic(err.Error())
		}

		rows, _ := upresult.RowsAffected()
		//println(rows)
		if err != nil {
			log.Printf("Error %s when finding rows affected", err)
			panic(err.Error())
		}
		trows = trows + int(rows)
	}
	return nil
}

func importDeck(fileDeck string) error {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	s := strings.Split(fileDeck, "_")
	fileName := s[1]

	dir, _ := os.UserHomeDir()
	dirFile := (dir + `\react_mtga\mtga_stats_beta\mtga_stats\server\Decks\` + fileName)

	file, err := os.Open(dirFile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	//variables
	var (
		side   string
		d      models.Deck
		colors string
	)
	d.Name = s[0]
	for scanner.Scan() {
		var (
			deck     string
			numcopy  int
			name     string
			set      string
			snumcopy string
			snum     string
			num      int
		)
		deck = d.Name
		line := scanner.Text()

		if line != "Deck" && line != "Sideboard" {
			for _, lnslce := range line {
				_, err := strconv.Atoi(string(lnslce))
				if err == nil {
					if numcopy == 0 {
						numcopy, _ = strconv.Atoi(string(lnslce))
						snumcopy = string(lnslce)
					} else if numcopy != 0 && name == "" {
						snumcopy = snumcopy + string(lnslce)
					} else if numcopy != 0 && name != "" && set != "" && set[len(set)-2:] != ") " {
						set = set + string(lnslce)
					} else if num == 0 && name != "" && set != "" {
						num, _ = strconv.Atoi(string(lnslce))
						snum = string(lnslce)
					} else if num != 0 {
						snum = snum + string(lnslce)
					}
				} else {
					sname := string(lnslce)
					if sname != "(" && set == "" {
						name = name + string(lnslce)
					} else if sname == "(" || set != "" {
						set = set + string(lnslce)
					}

				}
			}
			numcopy, _ = strconv.Atoi(snumcopy)
			num, _ = strconv.Atoi(snum)
			set = strings.TrimSpace(set)
			set = strings.TrimLeft(strings.TrimRight(set, ")"), "(")
			name = strings.TrimSpace(name)
			if numcopy == 0 && num == 0 {
				continue
			}
			// perform a db.Query insert
			query := "INSERT INTO cards(deck, numcopy, cardname, `set`, setnum, side_board) VALUES (?, ?, ?, ?, ?, ?)"
			ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
			defer cancelfunc()
			stmt, err := db.PrepareContext(ctx, query)
			if err != nil {
				log.Printf("Error %s when preparing SQL statement", err)
				panic(err.Error())
			}
			defer stmt.Close()
			res, err := stmt.ExecContext(ctx, deck, numcopy, name, set, num, side)
			if err != nil {
				log.Printf("Error %s when inserting row into card table", err)
				panic(err.Error())
			}
			rows, err := res.RowsAffected()
			if err != nil {
				log.Printf("Error %s when finding rows affected", err)
				panic(err.Error())
			}
			log.Printf("%d row inserted: ", rows)
		} else if line == "Sideboard" {
			side = "y"
		}
	}
	color_results, err := db.Query(`
		select distinct
			case
				when length(s.colors) = 1 then 
					case
						when s.colors = 'U' then 'Blue'
						when s.colors = 'R' then 'Red'
						when s.colors = 'B' then 'Black'
						when s.colors = 'G' then 'Green'
						when s.colors = 'W' then 'White'
					end
				when length(s.colors) = 2 then
					case 
						when s.colors in ('BG', 'GB') then 'Black, Green'
						when s.colors in ('BR', 'RB') then 'Black, Red'
						when s.colors in ('BU' ,'UB') then 'Black, Blue'
						when s.colors in ('BW' ,'WB') then 'Black, White'
						when s.colors in ('RU' ,'UR') then 'Red, Blue'
						when s.colors in ('RG' ,'GR') then 'Red, Green'
						when s.colors in ('RW' ,'WR') then 'Red, White'
						when s.colors in ('UG' ,'GU') then 'Blue, Green'
						when s.colors in ('UW' ,'WU') then 'Blue, White'
						when s.colors in ('GW' ,'WG') then 'Green, White'
					end
				when length(s.colors) = 3 then
					case 
						when s.colors in ('BGR', 'BRG', 'GRB', 'GBR', 'RBG', 'RGB') then 'Black, Red, Green'
						when s.colors in ('BUR', 'BRU', 'URB', 'UBR', 'RBU', 'RUB') then 'Black, Red, Blue'
						when s.colors in ('BWR', 'BRW', 'WRB', 'WBR', 'RBG', 'RGB') then 'Black, Red, White'
						when s.colors in ('BGU', 'BUG', 'GUB', 'GBU', 'UBG', 'UGB') then 'Black, Green, Blue'
						when s.colors in ('BGW', 'BWG', 'GWB', 'GBW', 'WBG', 'WGB') then 'Black, Green, White'
						when s.colors in ('BWU', 'BUW', 'WUB', 'WBU', 'UBW', 'UWB') then 'Black, Blue, White'
						when s.colors in ('RGU', 'RUG', 'GUR', 'GRU', 'URG', 'UGR') then 'Red, Green, Blue'
						when s.colors in ('RGW', 'RWG', 'GWR', 'GRW', 'WRG', 'WGR') then 'Red, Green, White'
						when s.colors in ('RGU', 'RUG', 'GUR', 'GRU', 'URG', 'UGR') then 'Red, Blue, White'
						when s.colors in ('WGU', 'WUG', 'GUW', 'GWU', 'UWG', 'UGW') then 'White, Green, Blue'
					end
				when length(s.colors) = 4 then
					case 
						when s.colors in ('BGWR', 'BGRW', 'BWGR', 'BWRG', 'BRWG', 'BRGW', 'GRWB', 'GRBW', 'GBWR', 'GBRW', 'GWBR', 'GWRB', 'RWBG', 'RWGB', 'RBWG', 'RBGW', 'RGBW', 'RGWB') then 'Black, Red, White, Green'
						when s.colors in ('BUWR', 'BURW', 'BWUR', 'BWRU', 'BRWU', 'BRUW', 'URWB', 'URBW', 'UBWR', 'UBRW', 'UWBR', 'UWRB', 'RWBU', 'RWUB', 'RBWU', 'RBUW', 'RUBW', 'RUWB') then 'Black, Red, White, Blue'
						when s.colors in ('BGUR', 'BGRU', 'BUGR', 'BURG', 'BRUG', 'BRGU', 'GRUB', 'GRBU', 'GBUR', 'GBRU', 'GUBR', 'GURB', 'RUBG', 'RUGB', 'RBUG', 'RBGU', 'RGBU', 'RGUB') then 'Black, Red, Blue, Green'
						when s.colors in ('BGWU', 'BGUW', 'BWGU', 'BWUG', 'BUWG', 'BUGW', 'GUWB', 'GUBW', 'GBWU', 'GBUW', 'GWBU', 'GWUB', 'UWBG', 'UWGB', 'UBWG', 'UBGW', 'UGBW', 'UGWB') then 'Black, Blue, White, Green'
						when s.colors in ('UGWR', 'UGRW', 'UWGR', 'UWRG', 'URWG', 'URGW', 'GRWU', 'GRUW', 'GUWR', 'GURW', 'GWUR', 'GWRU', 'RWUG', 'RWGU', 'RUWG', 'RUGW', 'RGUW', 'RGWU') then 'Blue, Red, White, Green'
					end
				else 'Black, White, Red, Blue, Green' 
			end as Colors
		from sets s 
			join cards c 
				on s.card_name = c.cardname 
		where length(s.colors) <> 0 AND c.deck=?`, d.Name)
	if err != nil {
		panic(err.Error())
	}

	for color_results.Next() {
		//get colors
		err = color_results.Scan(&colors)
		println(colors)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		if strings.Contains(colors, "Black") {
			if !strings.Contains(d.Colors, "Black") {
				if len(d.Colors) < 1 {
					d.Colors = "Black"
				} else {
					d.Colors += ", Black"
				}
			}
		}
		if strings.Contains(colors, "White") {
			if !strings.Contains(d.Colors, "White") {
				if len(d.Colors) < 1 {
					d.Colors = "White"
				} else {
					d.Colors += ", White"
				}
			}
		}
		if strings.Contains(colors, "Blue") {
			if !strings.Contains(d.Colors, "Blue") {
				if len(d.Colors) < 1 {
					d.Colors = "Blue"
				} else {
					d.Colors += ", Blue"
				}
			}
		}
		if strings.Contains(colors, "Green") {
			if !strings.Contains(d.Colors, "Green") {
				if len(d.Colors) < 1 {
					d.Colors = "Green"
				} else {
					d.Colors += ", Green"
				}
			}
		}
		if strings.Contains(colors, "Red") {
			if !strings.Contains(d.Colors, "Red") {
				if len(d.Colors) < 1 {
					d.Colors = "Red"
				} else {
					d.Colors += ", Red"
				}
			}
		}

	}

	results := db.QueryRow("SELECT SUM(numcopy) FROM cards WHERE side_board <> 'y' AND deck=?", d.Name)
	err = results.Scan(&d.Num_Cards)
	if err != nil {
		panic(err.Error())
	}

	results = db.QueryRow("SELECT CASE WHEN ISNULL(numcopy) THEN 0 ELSE SUM(numcopy) END FROM cards WHERE side_board <> 'y' AND cardname IN (SELECT DISTINCT SUBSTRING_INDEX(card_name,'/',1)  FROM sets WHERE types = 'Land' AND card_side IN ('a','')) AND deck=?", d.Name)
	err = results.Scan(&d.Num_Lands)
	if err != nil {
		panic(err.Error())
	}

	results = db.QueryRow("SELECT CASE WHEN ISNULL(numcopy) THEN 0 ELSE SUM(numcopy) END FROM cards WHERE side_board <> 'y' AND cardname IN (SELECT DISTINCT SUBSTRING_INDEX(card_name,'/',1) FROM sets WHERE types = 'Creature' AND card_side IN ('a','')) AND deck=?", d.Name)
	err = results.Scan(&d.Num_Creat)
	if err != nil {
		panic(err.Error())
	}

	results = db.QueryRow("SELECT CASE WHEN ISNULL(numcopy) THEN 0 ELSE SUM(numcopy) END FROM cards WHERE side_board <> 'y' AND cardname IN (SELECT DISTINCT SUBSTRING_INDEX(card_name,'/',1)  FROM `sets` WHERE types IN ('Instant','Sorcery') AND card_side IN ('a','')) AND deck=?", d.Name)
	err = results.Scan(&d.Num_Spells)
	if err != nil {
		panic(err.Error())
	}

	results = db.QueryRow("SELECT CASE WHEN ISNULL(numcopy) THEN 0 ELSE SUM(numcopy) END FROM cards WHERE side_board <> 'y' AND cardname IN (SELECT DISTINCT SUBSTRING_INDEX(card_name,'/',1)  FROM `sets` WHERE types IN ('Enchantment') AND card_side IN ('a','')) AND deck=?", d.Name)
	err = results.Scan(&d.Num_Enchant)
	if err != nil {
		panic(err.Error())
	}

	results = db.QueryRow("SELECT CASE WHEN ISNULL(numcopy) THEN 0 ELSE SUM(numcopy) END FROM cards WHERE side_board <> 'y' AND cardname IN (SELECT DISTINCT SUBSTRING_INDEX(card_name,'/',1)  FROM `sets` WHERE types IN ('Artifact') AND card_side IN ('a','')) AND deck=?", d.Name)
	err = results.Scan(&d.Num_Art)
	if err != nil {
		panic(err.Error())
	}

	d.Date_Entered = time.Now()
	d.Disable = 1
	newDeck(d)
	return nil
}

func updateDeck(d models.Deck) error {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	defer db.Close()
	println(d.Num_Cards)
	println(d.Name)
	println(d.Colors)
	// perform a db.Query insert
	result, err := db.Exec("UPDATE decks SET colors=?, favorite=?, numcards=?, numlands=?, numspells=?, numcreatures=?, numenchant=?, numartifacts=?, disable=? WHERE name=?",
		d.Colors, d.Favorite, d.Num_Cards, d.Num_Lands, d.Num_Spells, d.Num_Creat, d.Num_Enchant, d.Num_Art, d.Disable, d.Name)

	rows, _ := result.RowsAffected()

	fmt.Println(rows)
	if err != nil {
		log.Printf("Error %s when finding rows affected", err)
		panic(err.Error())
	}
	return nil
}

func deleteDeck(d string) error {
	// Open up our database connection.
	db := processing.Opendb()
	// defer the close till after the main function has finished
	defer db.Close()

	// archive deck record
	query := "INSERT INTO decks_deleted(name, colors, date_entered, favorite, max_streak, cur_streak, numcards, numlands, numspells, numcreatures, disable) SELECT name, colors, date_entered, favorite, max_streak, cur_streak, numcards, numlands, numspells, numcreatures, disable FROM decks WHERE name=?"
	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		log.Printf("Error %s when preparing SQL statement", err)
		panic(err.Error())
	}
	defer stmt.Close()
	res, err := stmt.ExecContext(ctx, d)
	if err != nil {
		log.Printf("Error %s when inserting row into deck table", err)
		panic(err.Error())
	}
	rows, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error %s when finding rows affected", err)
		panic(err.Error())
	}
	log.Printf("%d deck archived ", rows)

	//delete record from deck table
	query = "DELETE FROM decks WHERE name=?"
	ctx, cancelfunc = context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	stmt, err = db.PrepareContext(ctx, query)
	if err != nil {
		fmt.Printf("Error %s when preparing SQL statement", err)
		panic(err.Error())
	}
	defer stmt.Close()
	res, err = stmt.ExecContext(ctx, d)
	if err != nil {
		log.Printf("Error %s when deleting row from deck table", err)
		panic(err.Error())
	}
	rows, err = res.RowsAffected()
	if err != nil {
		log.Printf("Error %s when finding rows affected", err)
		panic(err.Error())
	}
	fmt.Printf("%d deck deleted\n", rows)
	//delete cards related to deck
	query = "DELETE FROM cards WHERE deck=?"
	ctx, cancelfunc = context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()
	stmt, err = db.PrepareContext(ctx, query)
	if err != nil {
		fmt.Printf("Error %s when preparing SQL statement", err)
		panic(err.Error())
	}
	defer stmt.Close()
	res, err = stmt.ExecContext(ctx, d)
	if err != nil {
		log.Printf("Error %s when deleting row from card table", err)
		panic(err.Error())
	}
	rows, err = res.RowsAffected()
	if err != nil {
		log.Printf("Error %s when finding rows affected", err)
		panic(err.Error())
	}
	fmt.Printf("%d cards deleted\n", rows)
	return nil
}
