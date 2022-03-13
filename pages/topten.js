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
                accessor: "num"
            },
            {
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Rank",
                accessor: "rank"
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