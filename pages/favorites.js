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
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Date Entered",
                accessor: "date_entered"
            },
            {
                Header: "Number of Wins",
                accessor: "numwins"
            },
            {
                Header: "Number of Loses",
                accessor: "numloses"
            }
        ],[]
    );

    const [Rows, getRows] = useState([]);
    const url = endpoint + "/api/favorites";
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
        rowObj.date_entered = rowData[1];
        rowObj.numwins = rowData[2];
        rowObj.numloses = rowData[3];
        data.push(rowObj);
        console.log(data);
    });

/*     const data = React.useMemo(
        () => [
            {
                deck: "test",
                date_entered: "2021-08-24",
                numwins: 2,
                numlose: 3
            },
            {
                deck: "test2",
                date_entered: "2021-12-24",
                numwins: 23,
                numlose: 33
            },
            {
                deck: "test3",
                date_entered: "2021-08-12",
                numwins: 26,
                numlose: 37
            }
        ],[]
    ); */
    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Favorites</h1>
            </div>
            <RankQuery columns={columns} data={data}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    )
}