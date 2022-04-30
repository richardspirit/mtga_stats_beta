import Link from "next/link";
import styles from '../styles/Home.module.css';
import Select from 'react-select';
import React, {useState, useEffect} from 'react';
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function NewGame() {
    const url = endpoint + "/api/newgame";
    const gameTypes = [{
        label: "Play",
        value: "Play"
    },{
        label: "Brawl",
        value: "Brawl"
    },{
        label: "Standard Ranked",
        value: "Standard Ranked"
    },{
        label: "Traditional Standard Play",
        value: "Traditional Standard Play"
    },{
        label: "Traditional Standard Ranked",
        value: "Traditional Standard Ranked"
    },{
        label: "Historic Ranked",
        value: "Historic Ranked"
    },{
        label: "Traditional Historic Ranked",
        value: "Traditional Historic Ranked"
    },{
        label: "Historic Brawl",
        value: "Historic Brawl"
    },{
        label: "Bot",
        value: "Bot"
    },{
        label: "Event",
        value: "Event"
    }];
    const [gameType, setGameType] = useState(null);

    const gameLevels = [{
        label: "Bronze",
        value: "Bronze"
    },{
        label: "Silver",
        value: "Silver"
    },{
        label: "Gold",
        value: "Silver"
    },{
        label: "Platinum",
        value: "Platinum"
    },{
        label: "Diamond",
        value: "Diamond"
    },{
        label: "Mythic",
        value: "Mythic"
    }];
    const [gameLevel, setGameLevel] = useState(null);

    const results = [{label: "Win", value: "Win"}, {label: "Lose", value: "Lose"}]
    const [gameResults, setGameResults] = useState(null);

    const [deck, setDeck] = useState(null);

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

    
    const handleChange = (obj) => {
        if (obj.value === "Win" || obj.value === "Lose"){
            setGameResults(obj);
            //console.log(obj);
        } else if (gameTypes.find(element => element.label === obj.label)) {
            setGameType(obj);
            //console.log(obj)
        } else if (gameLevels.find(element => element.label === obj.label)) {
            setGameLevel(obj);
        } else if (deckname.find(element => element.label === obj.label)) {
            setDeck(obj);
        }
     }

     const newGame = async event => {
        event.preventDefault();

        let result
        if (gameResults.value === "Win"){
            result = 0;
        } else {
            result = 1;
        }

        const res  = await fetch(url, {
            body: JSON.stringify({
                results: result,
                deck: deck.value,
                opponent: event.target.oppname.value,
                level: gameLevel.value + "-" + event.target.tier.value,
                gametype: gameType.value,
                cause: event.target.reason.value
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
            })
            .catch(err => {
                if (err){
                    alert(err)
                }
                //console.log(err)
            })
            
            setGameResults("");
            setDeck(null);
            event.target.oppname.value = "";
            setGameLevel(null);
            setGameType(null);
            event.target.reason.value = "";
            event.target.tier.value = "";
    }

    return (
        <>
        <main className={styles.main} style={{backgroundImage: `url("./five_symbols.jpg")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title} style={{color: 'blue', backgroundColor: 'rgba(52, 52, 52, 0.4)'}}>Record New Game</h1>
            </div>
            <form onSubmit={newGame} style={{backgroundColor: 'grey', opacity: '85%'}}>

                    <label htmlFor="results" className={styles.newgame}>
                        Results: 
                        <Select
                            onChange={handleChange}
                            defaultValue={gameResults}
                            options={results}
                        />
                    </label>
                    
                    <label htmlFor="deckname" className={styles.newgame}>
                        <span>Deck Name </span>
                        <Select
                            defaultValue={deck}
                            onChange={handleChange}
                            options={deckname}
                        />
                    </label>
                    
                    <label htmlFor="oppname" className={styles.newgame}>
                        <span>Opponent Name </span>
                        <input id="oppname" type="text" required />
                    </label>
                <div className={styles.newgame}>
                    <label htmlFor="gamelvl">
                        Game Level: 
                        <Select
                            onChange={handleChange}
                            defaultValue={gameLevel}
                            options={gameLevels}
                        />
                    </label>
                </div>
                    <label htmlFor="tier" className={styles.newgame}>
                        <span>Tier: </span>
                        <input id="tier" type="number" min="1" max="4" />
                    </label>
                <div className={styles.newgame}>
                    <label>
                        Game Type:
                        <Select
                            onChange={handleChange}
                            defaultValue={gameType}
                            options={gameTypes}
                        />
                    </label>
                </div>
                <div className={styles.newgame}>
                    <label htmlFor="reason">
                        <span>Reason: </span>
                        <textarea id="reason" required style={{width: '240px', height: '30px'}} />
                    </label>
                </div>
                <div style={{textAlign: 'center', paddingBottom: '10px'}}>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link href="/">
                <a style={{color: 'black', fontWeight: 'bold'}}>Back Home</a>
            </Link>
        </main>
        </>
    )
}