import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import Select from 'react-select';

const endpoint = "http://localhost:8080";

export default function DeckDetail() {
    const [Row, getRow] = useState([]);
    let url = endpoint + `/api/deckdetails`;
    const data = [];
    let deckData = [];
    const [DeckData, setDeckData] = useState(deckData);

    const getData = () => {
        fetch(url).then((res) => res.json())
            .then((res) => {
                getRow(res);
            })
    };

    useEffect(() => {
        getData()
    },[]);

    let count = 0;
    if (Row) {
        Row.forEach(element => {
            const rowData = element.split("|");
            const rowObj = {};
            rowObj.deck = rowData[0];
            rowObj.totalcards = rowData[1];
            rowObj.totalcreat = rowData[2];
            rowObj.maxstreak = rowData[3];
            rowObj.color = rowData[4];
            rowObj.total_lands = rowData[5];
            rowObj.totalenchant = rowData[6];
            rowObj.curstreak = rowData[7];
            rowObj.date_entered = rowData[8];
            rowObj.totalspells = rowData[9];
            rowObj.totalartifact = rowData[10];
            rowObj.favorite = rowData[11];        
            data.push(rowObj);
            count++;
    
        });
    }
    
    const [Decks, getDecks] = React.useState([]);
    const urld = endpoint + "/api/deckname";
    const deckname = []
    const getName = () => {
        fetch(urld).then((res) => res.json())
        .then((res) => {
            getDecks(res);
        })
    };

    useEffect(() => {
        getName()
    },[]);

    if (Decks) {
        Decks.forEach(deck => {
            let rowObj = {};
            rowObj.label = deck;
            rowObj.value = deck;
            deckname.push(rowObj);
        });
    }

    const [Name, setName] = useState('');
    const [Colors, setColors] = useState('');
    const [Favorite, setFavorite] = useState('');
    const [Cards, setCards] = useState('');
    const [Spells, setSpells] = useState('');
    const [Creatures, setCreatures] = useState('');
    const [Lands, setLands] = useState('');
    const [Enchantments, setEnchantments] = useState('');
    const [Artifacts, setArtifacts] = useState('');
    const [Streak, setStreak] = useState('');
    const [MaxStreak, setMaxStreak] = useState('');
    const [DateCreated, setDateCreated] = useState('');
    const [selectedOption, setSelectedOption] = useState('None');
    //console.log("testing")
    const handleChange = (obj) => {
        setSelectedOption(obj);
        deckData = data.find(element => element.deck === obj.label);
        setDeckData(deckData);
            Object.entries(deckData).map(([key, value])=>{
                    switch(key) {
                        case 'deck':
                            setName(value);
                            break;
                        case 'color':
                            setColors(value);
                            break;
                        case 'favorite':
                            setFavorite(value);
                            break;
                        case 'totalcards':
                            setCards(value);
                            break;
                        case 'totalspells':
                            setSpells(value);
                            break;
                        case 'totalcreat':
                            setCreatures(value);
                            break;
                        case 'total_lands':
                            setLands(value);
                            break;
                        case 'totalenchant':
                            setEnchantments(value);
                            break;
                        case 'totalartifact':
                            setArtifacts(value);
                            break;
                        case 'curstreak':
                            setStreak(value);
                            break;
                        case 'maxstreak':
                            setMaxStreak(value);
                            break;
                        case 'date_entered':
                            setDateCreated(value);
                    }
            })
     }
     //console.log("testing2")
     const url_update = endpoint + "/api/updatedeck"
     const updateDeck = async event => {
        //event.preventDefault();
        let fav
        if (event.target.favorite.value === "Yes"){
            fav = 0;
        } else {
            fav = 1;
        }

        const res  = await fetch(url_update, {
            body: JSON.stringify({
                name: event.target.name.value,
                colors: event.target.colors.value,
                favorite: fav,
                num_cards: parseInt(event.target.num_cards.value,10),
                num_spells: parseInt(event.target.num_spells.value,10),
                num_creat: parseInt(event.target.num_creat.value,10),
                num_lands: parseInt(event.target.num_lands.value,10),
                num_enchant: parseInt(event.target.num_enchant.value,10),
                num_art: parseInt(event.target.num_art.value,10)
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
            })
            .catch(err => {
                if (err){
                    alert("Deck Already Exists")
                }
                //console.log(err)
            })
    }
    //console.log("testing3")
    const url_delete = endpoint + "/api/deletedeck"
    const deleteDeck = async event => {
        const res = await fetch(url_delete, {
            body: JSON.stringify(Name),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
    }

    return (
        <>
            <main className={styles.main} style={{backgroundImage: `url("./mtgvow_vowkeyart_2560x1600.jpg")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title}>Deck Details</h1>
            </div>
            <div>
                <Select
                    defaultValue={selectedOption}
                    onChange={handleChange}
                    options={deckname} />
            </div>
            <br />
            <form onSubmit={updateDeck} style={{minWidth: '1000px', minHeight: '220px', backgroundColor: 'grey', opacity: '85%'}}>            
                <div className={styles.newdeck}>
                    <label htmlFor="name">
                        <span> Deck Name </span>
                        <input id="name" type="text" defaultValue={Name} readOnly />
                    </label>

                    <label htmlFor="colors">
                        <span> Colors </span>
                        <input id="colors" type="text" defaultValue={Colors} />
                    </label>
                    
                    <label htmlFor="favorite">
                        <span> Favorite </span>
                        <input id="favorite" type="text" defaultValue={Favorite} style={{width: '40px'}} />
                    </label>
                </div>
                <div className={styles.newdeck}>
                    <label htmlFor="numcards">
                        <span> Total Number of Cards </span>
                        <input id="num_cards" type="text" defaultValue={Cards} style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numspells">
                        <span> Total Instant/Sorceries </span>
                        <input id="num_spells" type="text" defaultValue={Spells} style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numcreature">
                        <span> Total Creatures </span>
                        <input id="num_creat" type="text" defaultValue={Creatures} style={{width: '40px'}}/>
                    </label>
                </div>
                <div className={styles.newdeck}>
                    <label htmlFor="numlands" style={{padding: '20px'}}>
                        <span> Total Lands </span>
                        <input id="num_lands" type="text" defaultValue={Lands} style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numenchant" style={{padding: '20px'}}>
                        <span> Total Enchantments </span>
                        <input id="num_enchant" type="text" defaultValue={Enchantments} style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numartifact" style={{padding: '20px'}}>
                        <span> Total Artifacts </span>
                        <input id="num_art" type="text" defaultValue={Artifacts} style={{width: '40px'}}/>
                    </label>
                </div>
                <div className={styles.newdeck}>
                    <label htmlFor="streak" style={{padding: '20px'}}>
                        <span> Current Streak </span>
                        <input id="streak" type="text" defaultValue={Streak} style={{width: '40px'}} readOnly />
                    </label>

                    <label htmlFor="maxstreak" style={{padding: '20px'}}>
                        <span> Max Streak </span>
                        <input id="max_streak" type="text" defaultValue={MaxStreak} style={{width: '40px'}} readOnly />
                    </label>

                    <label htmlFor="datecreated" style={{padding: '20px'}}>
                        <span> Date Entered </span>
                        <input id="date_created" type="text" defaultValue={DateCreated} style={{width: '80px'}} readOnly />
                    </label>
                </div>
                <div style={{textAlign: 'center', paddingBottom: '10px'}}>
                    <button type="submit">Save</button>
                    <button onClick={deleteDeck}>Delete Deck</button>
                </div>
            </form>
            <br />
            <Link href="/">
                <a style={{color: 'white'}}>Back Home</a>
            </Link>
            </main>
        </>
    );
}