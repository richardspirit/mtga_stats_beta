import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import RankQuery from "./api/resultquery";
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function GameCount() {
    const columns = React.useMemo(
        () => [
            {
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Game Count",
                accessor: "gamecount"
            }
        ],[]
    );

    const [Rows, getRows] = useState([]);
    const url = endpoint + "/api/count";
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
        rowObj.deck = rowData[0];
        rowObj.gamecount = rowData[1];
        data.push(rowObj);
        console.log(data);
    });

/*     const data = React.useMemo(
        () => [
            {
                deck: "gamecount",
                gamecount: 30
            },
            {
                deck: "gamecount2",
                gamecount: 301
            },
            {
                deck: "gamecount3",
                gamecount: 3
            }
        ],[]
    ); */
    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Game Count</h1>
            </div>
            <RankQuery columns={columns} data={data}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    )
}