import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import RankQuery from "./api/resultquery";
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function DeckRank() {
    const columns = React.useMemo(
        () => [
            {
                Header: () => (<div style={{textAlign: "left", color: 'blue'}}>Rank</div>),
                accessor: "rank",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            },
            {
                Header: () => (<div style={{textAlign: "left", color: 'blue'}}>Deck</div>),
                accessor: "deck",
                minWidth: 50,
                width: 200,
                maxWidth: 400
            },
            {
                Header: () => (<div style={{textAlign: "left", color: 'blue'}}>Wins</div>),
                accessor: "wins",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            },
            {
                Header: () => (<div style={{textAlign: "left", color: 'blue'}}>Loses</div>),
                accessor: "loses",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            }
        ],[]
    );

    const [Rows, getRows] = useState([]);
    const url = endpoint + "/api/rank";
    const data = [];
    const getData = () => {
        fetch(url).then((res) => res.json())
            .then((res) => {
                getRows(res);
            })
    };

    useEffect(() => {
        getData()
    },[]);

    Rows.forEach(element => {
        const rowData = element.split("|");
        let i = 0;
        let rowObj = {};
        rowObj.rank = rowData[0];
        rowObj.deck = rowData[1];
        rowObj.wins = rowData[2];
        rowObj.loses = rowData[3];
        data.push(rowObj);
        console.log(data);
    });

    return (
        <>
            <main className={styles.main} style={{backgroundImage: `url("./forest.png")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title} style={{backgroundColor: 'rgba(52, 52, 52, 0.2)'}}> Deck Ranking </h1>
            </div>
            <div style={{backgroundColor: 'rgba(255,255,255, 0.3)'}}>
            <RankQuery columns={columns} data={data}/>
            </div>
            <Link href="/">
                <a style={{color: 'white'}}>Back Home</a>
            </Link>
            </main>
        </>
    )
}