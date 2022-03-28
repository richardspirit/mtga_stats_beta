import Link from "next/link";
import styles from '../../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import ResultQuery from "../api/resultquery";
import Select from 'react-select';
// import Layout from "../components/layout";
const endpoint = "http://localhost:8080";


export default function Games() {
    const columns = [
            {
                Header: "Day",
                accessor: "day"
            },
            {
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Wins",
                accessor: "winsloses"
            }
        ]

    const gameOptions = [{
            label: "Best Deck",
            value: "best"
        },{
            label: "Worst Deck",
            value: "worst"
        },{
            label: "Wins",
            value: "w"
        },{
            label: "Loses",
            value: "l"
        }]

    const dayOptions = [{
        label: "Monday",
        value: "monday"
    },{
        label: "Tuesday",
        value: "tuesday"
    },{
        label: "Wednesday",
        value: "wednesday"
    },{
        label: "Thursday",
        value: "thursday"
    },{
        label: "Friday",
        value: "friday"
    },{
        label: "Saturday",
        value: "saturday"
    },{
        label: "Sunday",
        value: "sunday"
    }]
    //console.log(gameOptions)
    const [deckOption, setDeckOption] = useState("all");
    const [gameOption, setGameOption] = useState();
    const [dayOption, setDayOption] = useState([]);
    const [column, setColumn] = useState([]);

    const [Row, getRow] = useState([]);
    let url = endpoint + `/api/anal/gamesbydayweek`;
    const data = [];
    const [analyData, setAnalyData] = useState([]);

    const getWinData = async () => {
      await fetch(url,{
            body: JSON.stringify({
                day: "",
                deck: "all",
                winsloses: "w"
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
    Row.forEach(element => {
        const rowData = element.split("|");
        const rowObj = {};
        rowObj.day = rowData[0];
        rowObj.deck = rowData[1];
        rowObj.winsloses = rowData[2];     
        data.push(rowObj);
        count++;
        //console.log(rowObj)
    });

    const [RowLose, getRowLose] = useState([]);
    const dataLose = [];
    const getLoseData = async () => {
        await fetch(url,{
            body: JSON.stringify({
                day: "",
                deck: 'all',
                winsloses: "l"
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
    RowLose.forEach(element => {
        const rowData = element.split("|");
        const rowObj = {};
        rowObj.day = rowData[0];
        rowObj.deck = rowData[1];
        rowObj.winsloses = rowData[2];
        dataLose.push(rowObj);
        countLose++;
    })
    
    const [Decks, getDecks] = React.useState([]);
    const urld = endpoint + "/api/deckname";
    //add all option to deckname selector
    const deckname = [{
        label: "All",
        value: "all"
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

        useEffect (() => {
            window.addEventListener('onChange', handleChange)
            window.removeEventListener('onChange', handleChange)
        },[column])    

     const handleChange = (obj) => {
        try {
         let analData = [];
         let allDecks = "all";
         let day
         let best = 0;
         let worst = 0;

         switch (true){
             case (obj.value === "best"):
                setGameOption("best")
                columns.splice(1,2,{Header: "Best Deck", accessor: "deck"},{Header: "Wins", accessor: "winsloses"});
                setColumn(columns);
                if ((dayOption.length === 0) && (deckOption === "all")){
                    data.forEach(i=>{
                        analData.push(i);
                    });
                } else if (dayOption) {
                    setDeckOption("all");
                    data.forEach(i=>{
                        if (i.day === dayOption.label){
                            if (i.winsloses > best){
                                analData = [];
                                analData.push(i);
                            } else if (i.winsloses = best){
                                analData.push(i);
                            };
                        };
                    });
                };
                break;
             case (obj.value === "worst"):
                 setGameOption("worst")
                columns.splice(1,2,{Header: "Worst Deck", accessor: "deck"},{Header: "Wins", accessor: "winsloses"});
                setColumn(columns);
                if ((dayOption.length === 0) && (deckOption === "all")){
                    dataLose.forEach(i=>{
                        analData.push(i);
                    });
                } else if (dayOption){
                    setDeckOption("all");
                    dataLose.forEach(i=>{
                        if (i.day === dayOption.label){
                            if (i.winsloses > worst){
                                worst = i.winsloses;
                                analData = [];
                                analData.push(i);                                
                            } else if (i.winsloses === worst){
                                analData.push(i);
                            };
                            //console.log(analData)
                        };
                    });
                };                
                break;
            case (dayOptions.find(element=>element.value === obj.value) === obj):
                setDayOption(obj);
                if ((gameOption === "best") && (deckOption === "all")){
                    data.forEach(i=>{
                        if (i.day === obj.label){
                            analData.push(i);
                        };
                    });
                } else if ((gameOption === "worst")&&(deckOption="all")) {
                    dataLose.forEach(i=>{
                        if (i.day === obj.label){
                            analData.push(i);
                        };
                    });
                } else {}
                break;
            case (deckname.find(element=>element.value === obj.value) === obj):
                setDeckOption(obj.value);
                if ((gameOption === "best") && dayOption.length !== 0){
                    data.forEach(i=>{
                        if ((i.day === dayOption.label)&&(i.deck === obj.label)){
                            analData.push(i);
                        };
                    });
                } else if ((gameOption === "worst")&&(dayOption !== 0)){
                    dataLose.forEach(i=>{
                        if((i.day === dayOption.label)&&(i.deck === obj.label)){
                            analData.push(i);
                        };
                    });
                };

/*             case (obj.value === "Best Deck") || (obj.value === "Worst Deck"):
                if ((obj.value === "Best Deck") || (gameOption === "w")){
                    setGameOption("w")
                    columns.splice(1,2,{Header: "Best Deck", accessor: "deck"},{Header: "Wins", accessor: "winsloses"})
                    setColumn(columns);
                    data.forEach(d=>{
                        if (d.winsloses > best) {
                            analData = [];
                            if (d.day === dayOption){
                                analData.push(d);
                                console.log(analData)
                            }                        
                        } else if (d.winsloses = best){
                            if (d.day === dayOption){
                                analData.push(d);
                            };
                        };
                    });
                } else {
                    setGameOption("l")
                    columns.splice(1,2,{Header: "Worst Deck", accessor: "deck"},{Header: "Loses", accessor: "winsloses"})
                    setColumn(columns);
                    dataLose.forEach(d=>{
                        if (d.winsloses > worst) {
                            analData = [];
                            if (d.day === dayOption){
                                analData.push(d);
                            }                        
                        } else if (d.winsloses = best){
                            if (d.day === dayOption){
                                analData.push(d);
                            }
                        }
                    })
                } */
                
               // break;

/*              case (obj.value === "All" && gameOption === "w" && dayOption) || (obj.value === "Best Deck" && deckOption === "all" && dayOption) 
                    || (dayOptions.find(element=>element.value === obj.value) === obj):
                columns.splice(1,2,{Header: "Best Deck", accessor: "deck"},{Header: "Wins", accessor: "winsloses"})
                setColumn(columns)

                if (dayOptions.find(element=>element.value === obj.value) === obj){
                    day = obj;
                    setDayOption(day);
                    data.forEach(i => {
                        if (i.day === obj.label){
                            analData.push(i);
                            //console.log(analData)
                        }
                    })
                    //console.log(data)
                }

                allDecks = "all";
                setDeckOption(allDecks);
                setAnalyData(analData); */
               // break;
                //console.log(obj.value)
/*             case (obj.value === "All" && gameOption === "l" && dayOption) || (obj.value === "Worst Deck" && deckOption === "all" && dayOption)
                    || (dayOptions.find(element=>element.value === obj.value) === obj):
                    columns.splice(1,2,{Header: "Worst Deck", accessor: "deck"},{Header: "Loses", accessor: "winsloses"})
                    setColumn(columns)
                    console.log(obj.value)
                    if (dayOptions.find(element=>element.value === obj.value) === obj){
                        day = obj;
                        setDayOption(day);
                        dataLose.forEach(i => {
                            if (i.day === obj.label){
                                analData.push(i);
                            }
                        })
                    }
                    
                    allDecks = "all";
                    setDeckOption(allDecks);
                    setAnalyData(analData);
                    break; */
         }

/*          setDeckOption(allDecks);
         setAnalyData(analData) */

/*          if ((obj.value === "All" && gameOption === "w") || (obj.value === "Best Deck" && deckOption === "all")){
            columns.splice(1,2,{Header: "Best Deck", accessor: "deck"},{Header: "Wins", accessor: "winsloses"})
            setColumn(columns)
            allDecks = "all";
            setDeckOption(allDecks);
            setAnalyData(data);
         } else if ((obj.value === "All" && gameOption === "l") || (obj.value === "Worst Deck" && deckOption === "all")){
            columns.splice(1,2,{Header: "Worst Deck", accessor: "deck"},{Header: "Loses", accessor: "winsloses"})
            setColumn(columns)
            allDecks = "all";
            setDeckOption(allDecks);
            setAnalyData(dataLose);
         } else if ((obj.value !== "All" && gameOption === "w") || (obj.value === "Best Deck" && deckOption !== "all")){
            columns.splice(1,2,{Header: "Best Deck", accessor: "deck"},{Header: "Wins", accessor: "winsloses"})
            setColumn(columns)
            if (obj.value !== "Best Deck" && obj.value !== "Worst Deck"){
                setDeckOption(obj.value);
                analData.shift();
                analData.push(data.find(element => element.deck === obj.value));
            } else {
                analData.shift();
                analData.push(data.find(element => element.deck === deckOption));
            }
            setAnalyData(analData);
         } else if ((obj.value !== "All" && gameOption === "lose")|| (obj.value === "Worst Day" && deckOption !== "n")){
            columns.splice(1,2,{Header: "Worst Day", accessor: "day"},{Header: "Most Loses", accessor: "winsloses"})
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
         } */
         //console.log(analyData)
         //console.log(column)
         setAnalyData(analData);
        } catch (error){
            console.log(error)
        }
     }

    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Wins/Loses By Day of the Week</h1>
            </div>
            <div>
            <Select
                    //defaultValue={gameOption}
                    id="game"
                    onChange={handleChange}
                    options={gameOptions} />
                <Select
                    defaultValue={dayOption}
                    id="day"
                    onChange={handleChange}
                    options={dayOptions} />
                <Select
                    defaultValue={deckOption}
                    id="deck"
                    onChange={handleChange}
                    options={deckname} />
            </div>
            <ResultQuery columns={column} data={analyData}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    );
}