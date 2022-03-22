import Link from "next/link";
import styles from '../../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import ResultQuery from "../api/resultquery";
import Select from 'react-select';
// import Layout from "../components/layout";
const endpoint = "http://localhost:8080";


export default function Games() {
    const columns = React.useMemo(
        () => [
            {
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Most Wins",
                accessor: "day"
            },
            {
                Header: "Total Wins",
                accessor: "winsloses"
            }
        ],[]
    );

    const gameOptions = [{
            label: "Best Day",
            value: "Best Day"
        },{
            label: "Worst Day",
            value: "Worst Day"
        },{
            label: "Monday",
            value: "Monday"
        },{
            label: "Tuesday",
            value: "Tuesday"
        },{
            label: "Wednesday",
            value: "Wednesday"
        },{
            label: "Thursday",
            value: "Thursday"
        },{
            label: "Friday",
            value: "Friday"
        },{
            label: "Saturday",
            value: "Saturday"
        },{
            label: "Sunday",
            value: "Sunday"
        }]
    //console.log(gameOptions)

    const [Row, getRow] = useState([]);
    let url = endpoint + `/api/anal/gamesbyday`;
    const data = [];
    const [AnalData, setAnalData] = useState([]);

    const getData = async () => {
      await fetch(url,{
            body: JSON.stringify({
                deck: deckOption,
                winsloses: gameOption
            }),
            method: "POST"
        }).then((res) => res.json())
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
        rowObj.day = rowData[1];
        rowObj.winsloses = rowData[2];     
        data.push(rowObj);
        count++;
        //console.log(rowObj)
    });
    
    const [Decks, getDecks] = React.useState([]);
    const urld = endpoint + "/api/deckname";
    const deckname = [{
        label: "All",
        value: "All"
    }]
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

    const [deckOption, setDeckOption] = useState("n");
    const [gameOption, setGameOption] = useState("win");

     const handleGameChange = (obj) => {
        //console.log(obj)
        if (obj.value === "Best Day"){
            setGameOption("win")
            getData()
            setAnalData(data)
            //console.log(deckOption)
        } else if (obj.value === "Worst Day") {
            setGameOption("lose")
            getData()
            setAnalData(data)            
            //console.log(deckOption)
        } 
     }

     const handDeckChange = (obj) => {
        let analData = []
        if (obj.value === "All"){
            setDeckOption("n")
            getData()
            setAnalData(data)            
            console.log(deckOption)
        } else {
            setDeckOption(obj.value)
            analData.shift();
            analData.push(data.find(element => element.deck === obj.value))
            setAnalData(analData)
        }

     }

    

    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Games By Date</h1>
            </div>
            <div>
                <Select
                    defaultValue={deckOption}
                    onChange={handDeckChange}
                    options={deckname} />
                <Select
                    defaultValue={gameOption}
                    onChange={handleGameChange}
                    options={gameOptions} />
            </div>
            <ResultQuery columns={columns} data={AnalData}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    );
}