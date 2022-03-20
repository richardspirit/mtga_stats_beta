package models

import "time"

type Deck struct {
	Name         string    `json:"name"`
	Colors       string    `json:"colors"`
	Date_Entered time.Time `json:"date_entered"`
	Favorite     int       `json:"favorite"`
	Max_Streak   int       `json:"max_streak"`
	Cur_Streak   int       `json:"cur_streak"`
	Num_Cards    int       `json:"num_cards"`
	Num_Lands    int       `json:"num_lands"`
	Num_Creat    int       `json:"num_creat"`
	Num_Spells   int       `json:"num_spells"`
	Num_Enchant  int       `json:"num_enchant"`
	Num_Art      int       `json:"num_art"`
	Disable      int       `json:"disable"`
}

type Game struct {
	Results       int    `json:"results"`
	Cause         string `json:"cause"`
	Deck          string `json:"deck"`
	Opponent      string `json:"opponent"`
	Level         string `json:"level"`
	CurrentStreak int    `json:"cur_streak"`
	MaxStreak     int    `json:"max_streak"`
	GameType      string `json:"gametype"`
}
