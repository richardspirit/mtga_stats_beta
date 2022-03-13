import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import RankQuery from "./api/resultquery";
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function ViewDecks() {
    const columns = React.useMemo(
        () => [
            {
                Header: "Deck Number",
                accessor: "count"
            },
            {
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Color/s",
                accessor: "color"
            },
            {
                Header: "Date Entered",
                accessor: "date_entered"
            },
            {
                Header: "Favorite",
                accessor: "favorite"
            },
            {
                Header: "Max Streak",
                accessor: "maxstreak"
            }
        ],[]
    );

    const [Rows, getRows] = useState([]);
    const url = endpoint + "/api/viewdecks";
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
        rowObj.count = rowData[0];
        rowObj.deck = rowData[1];
        rowObj.color = rowData[2];
        rowObj.date_entered = rowData[3];
        rowObj.favorite = rowData[4];
        rowObj.maxstreak = rowData[5];
        data.push(rowObj);
        console.log(data);
    });

    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Deck Summary</h1>
            </div>
            <RankQuery columns={columns} data={data}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    )
}