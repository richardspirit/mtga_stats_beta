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
                Header: () => (<div style={{textAlign: "left"}}>Deck</div>),
                accessor: "deck",
                minWidth: 150,
                width: 250,
                maxWidth: 300
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Date Entered</div>),
                accessor: "date_entered",
                minWidth: 50,
                width: 150,
                maxWidth: 200
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Wins</div>),
                accessor: "numwins",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Loses</div>),
                accessor: "numloses",
                minWidth: 5,
                width: 100,
                maxWidth: 150
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
        //console.log(data);
    });

    return (
        <>
            <main className={styles.main} style={{backgroundImage: `url("./brokers_ascendancy_2560x1600.jpg")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title}>Favorites</h1>
            </div>
            <div style={{backgroundColor: 'rgba(210, 215, 211, 0.6)'}}>
                <RankQuery columns={columns} data={data}/>
            </div>
            <Link href="/">
                <a style={{color: 'white'}}>Back Home</a>
            </Link>
            </main>
        </>
    )
}