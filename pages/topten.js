import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import RankQuery from "./api/resultquery";
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function TopTen() {
    const columns = React.useMemo(
        () => [
            {
                Header: "",
                accessor: "num",
                minWidth: 5,
                width: 10,
                maxWidth: 15
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Deck</div>),
                accessor: "deck",
                minWidth: 5,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Rank</div>),
                accessor: "rank",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Wins</div>),
                accessor: "wins",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Loses</div>),
                accessor: "loses",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            }
        ],[]
    );

    const [Rows, getRows] = useState([]);
    const url = endpoint + "/api/topten";
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

    if (Rows) {
        Rows.forEach(element => {
            const rowData = element.split("|");
            let i = 0;
            let rowObj = {};
            rowObj.num = rowData[0];
            rowObj.deck = rowData[1];
            rowObj.rank = rowData[2];
            rowObj.wins = rowData[3];
            rowObj.loses = rowData[4];
            data.push(rowObj);
            console.log(data);
        });
    }

    return (
        <>
            <main className={styles.main} style={{backgroundImage: `url("./mtgvow_sorin_markov_2560x1600.jpg")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title}>Top Ten Decks</h1>
            </div>
            <div style={{backgroundColor: 'rgba(255, 10, 10, 0.5)'}}>
            <RankQuery columns={columns} data={data}/>
            </div>
            <Link href="/">
                <a style={{color: 'white'}}>Back Home</a>
            </Link>
            </main>
        </>
    )
}