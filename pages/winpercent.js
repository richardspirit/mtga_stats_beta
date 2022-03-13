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
                Header: "Win Percentage",
                accessor: "winpercent"
            },
            {
                Header: "Number of Wins",
                accessor: "numwins"
            },
            {
                Header: "Number of Games",
                accessor: "numgame"
            }
        ],[]
    );

    const [Rows, getRows] = useState([]);
    const url = endpoint + "/api/winpercent";
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
        rowObj.winpercent = rowData[1];
        rowObj.numwins = rowData[2];
        rowObj.numgame = rowData[3];
        data.push(rowObj);
        console.log(data);
    });

/*     const data = React.useMemo(
        () => [
            {
                deck: "test",
                winpercent: "21%",
                numwins: 2,
                numgame: 3
            },
            {
                deck: "test2",
                winpercent: "50%",
                numwins: 12,
                numgame: 23
            },
            {
                deck: "test3",
                winpercent: "60%",
                numwins: 24,
                numgame: 34
            }
        ],[]
    ); */
    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Win Percentage</h1>
            </div>
            <RankQuery columns={columns} data={data}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    )
}