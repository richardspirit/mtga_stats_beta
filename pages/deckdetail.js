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
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Total Cards",
                accessor: "totalcards"
            },
            {
                Header: "Total Creatures",
                accessor: "totalcreat"
            },
            {
                Header: "Max Streak",
                accessor: "maxstreak"
            },
            {
                Header: "Color/s",
                accessor: "color"
            },
            {
                Header: "Total Lands",
                accessor: "total_lands"
            },
            {
                Header: "Total Enchantments",
                accessor: "totalenchant"
            },
            {
                Header: "Current Streak",
                accessor: "curstreak"
            },
            {
                Header: "Date Entered",
                accessor: "date_entered"
            },
            {
                Header: "Total Instants/Sorcery",
                accessor: "totalspells"
            },
            {
                Header: "Total Artifacts",
                accessor: "totalartifact"
            },
            {
                Header: "Favorite",
                accessor: "favorite"
            }
        ],[]
    );

    const [Row, getRow] = useState([]);
    let url = endpoint + `/api/deckdetails`;
    const data = [];
    let deckData = [];
    const [DeckData, setDeckData] = useState([]);

    const dataDeck = () => {
        deckData.push(data[0]);
        //console.log(deckData)
    };

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

        if (count === Array.length){
            dataDeck();
        }
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
        //console.log(deckData);
        setDeckData(deckData);
     }

    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Deck Details</h1>
            </div>
            <div>
                <Select
                    defaultValue={selectedOption}
                    onChange={handleChange}
                    options={deckname} />
            </div>
            <RankQuery columns={columns} data={DeckData}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    );
}