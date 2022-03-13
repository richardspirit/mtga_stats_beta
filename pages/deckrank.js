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
                Header: "Rank",
                accessor: "rank"
            },
            {
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Wins",
                accessor: "wins"
            },
            {
                Header: "Loses",
                accessor: "loses"
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
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Deck Ranking</h1>
            </div>
            <RankQuery columns={columns} data={data}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    )
}