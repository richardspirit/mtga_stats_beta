import Link from "next/link";
import styles from '../../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import ResultQuery from "../api/resultquery";
import Select from 'react-select';
const endpoint = "http://localhost:8080";


export default function Games() {
    const columns = [
            {
                Header: () => (<div style={{textAlign: "left"}}>Deck</div>),
                accessor: "deck",
                minWidth: 150,
                width: 250,
                maxWidth: 300
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Most Wins</div>),
                accessor: "day",
                minWidth: 150,
                width: 250,
                maxWidth: 300
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Total Wins</div>),
                accessor: "winsloses",
                minWidth: 150,
                width: 250,
                maxWidth: 300
            }
        ]

    const gameOptions = [{
            label: "Best Day",
            value: "Best Day"
        },{
            label: "Worst Day",
            value: "Worst Day"
        }]
    //console.log(gameOptions)
    const [deckOption, setDeckOption] = useState("n");
    const [gameOption, setGameOption] = useState("win");
    const [column, setColumn] = useState([]);

    const [Row, getRow] = useState([]);
    let url = endpoint + `/api/anal/gamesbyday`;
    const data = [];
    const [analyData, setAnalyData] = useState([]);

    const getWinData = async () => {
      await fetch(url,{
            body: JSON.stringify({
                deck: deckOption,
                winsloses: "win"
            }),
            method: "POST"
        }).then((res) => res.json())
            .then((res) => {
                getRow(res);
            })
    };

    useEffect(() => {
        getWinData()
    },[]);

    let count = 0;
    if (Row) {
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
    }

    const [RowLose, getRowLose] = useState([]);
    const dataLose = [];

    const getLoseData = async () => {
        await fetch(url,{
            body: JSON.stringify({
                deck: deckOption,
                winsloses: "lose"
            }),
            method: "POST"
        }).then((res) => res.json())
            .then((res) => {
                getRowLose(res);
            })
    };

    useEffect(() => {
        getLoseData()
    },[]);
    let countLose = 0;
    if (RowLose) {
        RowLose.forEach(element => {
            const rowData = element.split("|");
            const rowObj = {};
            rowObj.deck = rowData[0];
            rowObj.day = rowData[1];
            rowObj.winsloses = rowData[2];
            dataLose.push(rowObj);
            countLose++;
        });
    }
    
    const [Decks, getDecks] = React.useState([]);
    const urld = endpoint + "/api/deckname";
    //add all option to deckname selector
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

    if (Decks) {
        Decks.forEach(deck => {
            let rowObj = {};
            rowObj.label = deck;
            rowObj.value = deck;
            deckname.push(rowObj);
        });
    }

        useEffect (() => {
            window.addEventListener('onChange', handleChange)
            window.removeEventListener('onChange', handleChange)
        },[column])

    const getState = (props) => {
        if (props.value === "Best Day"){
            setGameOption("win")
            //columns.splice(1,2,{Header: "Best Day", accessor: "day"},{Header: "Most Wins", accessor: "winsloses"})
            //setColumn(columns);
        } else if (props.value === "Worst Day") {
            setGameOption("lose")
            //columns.splice(1,2,{Header: "Worst Day", accessor: "day"},{Header: "Most Loses", accessor: "winsloses"})
            //setColumn(columns);
        }
    }
     const handleChange = (obj) => {
        try {
         let analData = [];
         let allDecks

         getState(obj);

         if ((obj.value === "All" && gameOption === "win") || (obj.value === "Best Day" && deckOption === "n")){
            columns.splice(1,2,{
                    Header: () => (<div style={{textAlign: "left"}}>Best Day</div>), 
                    accessor: "day"
                },{
                    Header: () => (<div style={{textAlign: "left"}}>Most Wins</div>), 
                    accessor: "winsloses"
                })
            setColumn(columns)
            allDecks = "n";
            setDeckOption(allDecks);
            setAnalyData(data);
         } else if ((obj.value === "All" && gameOption === "lose") || (obj.value === "Worst Day" && deckOption === "n")){
            columns.splice(1,2,{
                Header: () => (<div style={{textAlign: "left"}}>Worst Day</div>), 
                accessor: "day"
            },{
                Header: () => (<div style={{textAlign: "left"}}>Most Loses</div>), 
                accessor: "winsloses"
            })
            setColumn(columns)
            allDecks = "n";
            setDeckOption(allDecks);
            setAnalyData(dataLose);
         } else if ((obj.value !== "All" && gameOption === "win") || (obj.value === "Best Day" && deckOption !== "n")){
            columns.splice(1,2,{
                Header: () => (<div style={{textAlign: "left"}}>Best Day</div>), 
                accessor: "day"
            },{
                Header: () => (<div style={{textAlign: "left"}}>Most Wins</div>), 
                accessor: "winsloses"})
            setColumn(columns)
            if (obj.value !== "Best Day" && obj.value !== "Worst Day"){
                setDeckOption(obj.value);
                analData.shift();
                analData.push(data.find(element => element.deck === obj.value));
            } else {
                analData.shift();
                analData.push(data.find(element => element.deck === deckOption));
            }
            setAnalyData(analData);
         } else if ((obj.value !== "All" && gameOption === "lose")|| (obj.value === "Worst Day" && deckOption !== "n")){
            columns.splice(1,2,{
                Header: () => (<div style={{textAlign: "left"}}>Worst Day</div>), 
                accessor: "day"
            },{
                Header: () => (<div style={{textAlign: "left"}}>Most Loses</div>), 
                accessor: "winsloses"
            })
            setColumn(columns)
            if (obj.value !== "Worst Day" && obj.value !== "Best Day"){
                setDeckOption(obj.value);
                analData.shift();
                analData.push(dataLose.find(element => element.deck === obj.value));
            } else {
                analData.shift();
                analData.push(dataLose.find(element => element.deck === deckOption));
            } 
            setAnalyData(analData);
         }
         //console.log(analyData)
        } catch (error){
            console.log(error)
        }
     }

    return (
        <>
        <div className={styles.analysis}>
            <main className={styles.main}>
            <div>
                <h1 className={styles.analysis_title}>Best and Worst Days</h1>
            </div>
            <div>
                <Select
                    onChange={handleChange}
                    options={deckname} 
                />
                <Select
                    onChange={handleChange}
                    options={gameOptions} 
                />
            </div>
            <ResultQuery columns={column} data={analyData}/>
            </main>
            <footer className={styles.footer}>
                <Link href="gamemenu">
                    <a>Back</a>
                </Link>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </footer>
        </div>
        </>
    );
}