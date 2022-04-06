import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import RankQuery from "./api/resultquery";
import Select from 'react-select';
// import Layout from "../components/layout";
const endpoint = "http://localhost:8080";


export default function DeckDetail() {
    const columns = React.useMemo(
        () => [
            {
                Header: () => (<div style={{textAlign: "left"}}>Deck</div>),
                accessor: "deck",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Total Cards</div>),
                accessor: "totalcards",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Total Creatures</div>),
                accessor: "totalcreat",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Max Streak</div>),
                accessor: "maxstreak",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Color/s</div>),
                accessor: "color",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            }
        ],[]
    );

    const columns2 = React.useMemo(
        () => [
            {
                Header: () => (<div style={{textAlign: "left"}}>Total Lands</div>),
                accessor: "total_lands",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Total Enchantments</div>),
                accessor: "totalenchant",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Current Streak</div>),
                accessor: "curstreak",
                minWidth: 5,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Date Entered</div>),
                accessor: "date_entered",
                minWidth: 5,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Total Instants/Sorcery</div>),
                accessor: "totalspells",
                minWidth: 5,
                width: 200,
                maxWidth: 250
            }
        ],[]
    );

    const columns3 = React.useMemo(
        () => [
            {
                Header: () => (<div style={{textAlign: "left"}}>Total Artifacts</div>),
                accessor: "totalartifact",
                minWidth: 5,
                width: 150,
                maxWidth: 25
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Favorite</div>),
                accessor: "favorite",
                minWidth: 5,
                width: 20,
                maxWidth: 25
            }
        ],[]
    );

    const [Row, getRow] = useState([]);
    let url = endpoint + `/api/deckdetails`;
    const data = [];
    const data2 = [];
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

    Decks.forEach(deck => {
        let rowObj = {};
        rowObj.label = deck;
        rowObj.value = deck;
        deckname.push(rowObj);
    });

    const [selectedOption, setSelectedOption] = useState(null);

     const handleChange = (obj) => {
        setSelectedOption(obj);
        deckData.shift();
        deckData.push(data.find(element => element.deck === obj.label))
        setDeckData(deckData);
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
            <br />
            <div style={{backgroundColor: 'rgba(255, 10, 10, 0.7)'}}>
            <br />
                <RankQuery columns={columns} data={DeckData}/>
            <br />
            <br />
                <RankQuery columns={columns2} data={DeckData}/>
            <br />
            <br />
            <div style={{display: 'flex', justifyContent:'center'}}>
                <RankQuery columns={columns3} data={DeckData}/>
            </div>
            <br />
            </div>
            <br />
            <br />
            <Link href="/">
                <a style={{color: 'white'}}>Back Home</a>
            </Link>
            </main>
        </>
    );
}