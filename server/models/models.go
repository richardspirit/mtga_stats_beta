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

type Anal struct {
	Deck      string `json:"deck"`
	Day       string `json:"day"`
	Wins      string `json:"wins"`
	Loses     string `json:"loses"`
	Winsloses string `json:"winsloses"`
	Reason    string `json:"reason"`
}

type Cards struct {
	Cards []struct {
		Artist            string        `json:"artist"`
		Availability      []string      `json:"availability"`
		BorderColor       string        `json:"borderColor"`
		ColorIdentity     []string      `json:"colorIdentity"`
		Colors            []string      `json:"colors"`
		ConvertedMana     float64       `json:"convertedManaCost"`
		FaceConvertedMana float64       `json:"faceConvertedManaCost"`
		FaceManaValue     float64       `json:"faceManaValue"`
		Rank              int           `json:"edhrecRank"`
		Finishes          []string      `json:"finishes"`
		ForeignData       []interface{} `json:"foreignData"`
		FrameVersion      string        `json:"frameVersion"`
		Foil              bool          `json:"hasFoil"`
		NonFoil           bool          `json:"hasNonFoil"`
		Identifiers       struct {
			McmID             string `json:"mcmId"`
			JSONID            string `json:"mtgjsonV4Id"`
			MultiverseID      string `json:"multiverseId"`
			ScryfallID        string `json:"scryfallId"`
			ScryFallPictureID string `json:"scryfallIllustrationId"`
			ScryfallOracleID  string `json:"scryfallOracleId"`
			ProductID         string `json:"tcgplayerProductId"`
		} `json:"identifiers"`
		Reprint    bool     `json:"isReprint"`
		Keywords   []string `json:"keywords"`
		Layout     string   `json:"layout"`
		Legalities struct {
			Commander string `json:"commander"`
			Duel      string `json:"duel"`
			Legacy    string `json:"legacy"`
			Oldschool string `json:"oldschool"`
			Penny     string `json:"penny"`
			Premodern string `json:"premodern"`
			Vintage   string `json:"vintage"`
		} `json:"legalities"`
		ManaCost     string   `json:"manaCost"`
		ManaValue    float64  `json:"manaValue"`
		Name         string   `json:"name"`
		Number       string   `json:"number"`
		OriginalText string   `json:"originalText"`
		OriginalType string   `json:"originalType"`
		Printings    []string `json:"printings"`
		PurchaseUrls struct {
			Tcgplayer string `json:"tcgplayer"`
		} `json:"purchaseUrls"`
		Rarity  string `json:"rarity"`
		Rulings []struct {
			Date string `json:"date"`
			Text string `json:"text"`
		} `json:"rulings"`
		SetCode    string   `json:"setCode"`
		Side       string   `json:"side"`
		Subtypes   []string `json:"subtypes"`
		Supertypes []string `json:"supertypes"`
		Text       string   `json:"text"`
		Type       string   `json:"type"`
		Types      []string `json:"types"`
		UUID       string   `json:"uuid"`
	} `json:"cards"`
}
