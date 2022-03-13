package models

import "time"

type Deck struct {
	Name         string
	Colors       string
	Date_Entered time.Time
	Favorite     int
	Max_Streak   int
	Cur_Streak   int
	Num_Cards    int
	Num_Lands    int
	Num_Creat    int
	Num_Spells   int
	Num_Enchant  int
	Num_Art      int
	Disable      int
}
