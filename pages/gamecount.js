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
                Header: () => (<div style={{textAlign: "left"}}>Deck</div>),
                accessor: "deck",
                minWidth: 5,
                width: 500,
                maxWidth: 1000
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Game Count</div>),
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

    return (
        <>
            <main className={styles.main} style={{backgroundImage: `url("./mtgsnc_metropolis_forest_1280x960.jpg")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title}>Game Count</h1>
            </div>
            <div style={{backgroundColor: 'rgba(255,255,0, 0.5)'}}>
            <RankQuery columns={columns} data={data}/>
            </div>
            <Link href="/">
                <a style={{color: 'white'}}>Back Home</a>
            </Link>
            </main>
        </>
    )
}