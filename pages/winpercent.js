import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import RankQuery from "./api/resultquery";
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function WinPercent() {
    const columns = React.useMemo(
        () => [
            {
                Header: () => (<div style={{textAlign: "left"}}>Deck</div>),
                accessor: "deck",
                minWidth: 150,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Win Percentage</div>),
                accessor: "winpercent",
                minWidth: 150,
                width: 100,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Number of Wins</div>),
                accessor: "numwins",
                minWidth: 150,
                width: 100,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Number of Games</div>),
                accessor: "numgame",
                minWidth: 150,
                width: 100,
                maxWidth: 250
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

    if (Rows) {
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
    }

    return (
        <>
            <main className={styles.main} style={{backgroundImage: `url("./mtgmid_wrenn_and_seven_2560x1600.jpg")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title}>Win Percentage</h1>
            </div>
            <div style={{backgroundColor: 'rgba(255, 165, 0, 0.5)'}}>
                <RankQuery columns={columns} data={data}/>
            </div>
            <Link href="/">
                <a style={{color: 'white'}}>Back Home</a>
            </Link>
            </main>
        </>
    )
}