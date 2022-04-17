package processing

import (
	"database/sql"
	"log"
)

func Opendb() *sql.DB {
	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/mtga_test?parseTime=true")
	// if there is an error opening the connection, handle it
	if err != nil {
		panic(err.Error())
	}
	return db
}

func Streaks(d string) {
	// Open up our database connection.
	db := Opendb()
	// defer the close till after the main function has finished
	// executing
	defer db.Close()

	var (
		max    int
		cur    int
		streak int
	)
	println("Deck Name: " + d)
	results, err := db.Query("SELECT deck, results FROM mtga.games WHERE deck=?", d)

	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	for results.Next() {
		var (
			name   string
			result int
		)

		// for each row, scan the result into our deck composite object
		err = results.Scan(&name, &result)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		//track and store streak values
		if result == 0 {
			if streak == 0 {
				cur++
				if cur > max {
					max = cur
				}
			} else if streak == 1 {
				streak = 0
				cur++
				if cur > max {
					max = cur
				}
			}
		} else if result == 1 {
			streak = 1
			cur = 0
		}
	}

	// perform a db.Query insert
	upresult, err := db.Exec("UPDATE mtga.decks SET max_streak=?, cur_streak=? where name=?", max, cur, d)

	rows, _ := upresult.RowsAffected()

	//fmt.Println(rows)
	if err != nil {
		log.Printf("Error %s when finding rows affected", err)
		panic(err.Error())
	}
	log.Println("deck updated ", rows)
}
