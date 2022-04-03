package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
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
	db := processing.Opendb()
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
	db := processing.Opendb()
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
	db := processing.Opendb()
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

	results, err := db.Query("SELECT name FROM mtga.decks")
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

	vquery = "SELECT name, colors, date_entered, favorite, max_streak, cur_streak, numcards, numlands, numspells, numcreatures, numenchant, numartifacts FROM mtga.decks"
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
	query := "INSERT INTO mtga.decks(name, colors, favorite, numcards, numlands, numspells, numcreatures, numenchant, numartifacts) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)"
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
	query := "INSERT INTO mtga.games(results, cause, deck, opponent, level, game_type) VALUES (?,?,?,?,?,?)"
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

	win_day_query = "SELECT deck, MAX(win_count) as max_win, day_of_week FROM mtga.wins_by_day WHERE deck=? AND deck IN (SELECT name FROM mtga.decks) GROUP BY deck, day_of_week ORDER BY win_count DESC LIMIT 1"
	win_day_all_query = "SELECT deck, win_count, day_of_week FROM mtga.most_wbd WHERE deck IN (SELECT name FROM mtga.decks) ORDER BY FIELD(day_of_week , 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'), win_count DESC;"
	lose_day_query = "SELECT deck, MAX(lose_count) as max_loses, day_of_week FROM mtga.loses_by_day WHERE deck=? AND deck IN (SELECT name FROM mtga.decks) GROUP BY deck, day_of_week ORDER BY lose_count DESC LIMIT 1"
	lose_day_all_query = "SELECT deck, lose_count, day_of_week FROM mtga.most_lbd WHERE deck IN (SELECT name FROM mtga.decks) ORDER BY FIELD(day_of_week , 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'), lose_count DESC"

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

	wins_loses = "SELECT w.day_of_week, w.deck, w.win_count, l.lose_count FROM mtga.wins_by_day w JOIN mtga.loses_by_day l ON w.deck = l.deck AND w.day_of_week = l.day_of_week"

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

	rsn_query = "SELECT deck, cause, results FROM mtga.games WHERE deck IN (SELECT name FROM mtga.decks) ORDER BY deck"

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

	tm_query = "SELECT deck, cause, TIME(`Timestamp`), results AS playtime FROM mtga.games WHERE deck IN (SELECT name FROM mtga.decks) ORDER BY deck"
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

	lvl_query = "SELECT deck, opponent, `level`, cause, results FROM mtga.games WHERE deck IN (SELECT name FROM mtga.decks) ORDER BY deck"
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

	results, err := db.Query("SELECT name, date_entered, win_pct, win_count, games FROM mtga.decks d JOIN mtga.win_percentage wp ON d.name = wp.deck WHERE win_pct <= .40 ORDER BY games DESC, name")

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
