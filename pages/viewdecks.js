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
                Header: "",
                accessor: "count",
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
                Header: () => (<div style={{textAlign: "left"}}>Color/s</div>),
                accessor: "color",
                minWidth: 5,
                width: 200,
                maxWidth: 250
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Date Entered</div>),
                accessor: "date_entered"
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Favorite</div>),
                accessor: "favorite",
                minWidth: 5,
                width: 100,
                maxWidth: 150
            },
            {
                Header: () => (<div style={{textAlign: "left"}}>Max Streak</div>),
                accessor: "maxstreak",
                minWidth: 5,
                width: 100,
                maxWidth: 150
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
            <main className={styles.main} style={{backgroundImage: `url("./the_five_dragons-sl-background-1280x960.jpg")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title} style={{backgroundColor: 'rgba(104, 99, 226, 0.4)'}}>Deck Summary</h1>
            </div>
            <div style={{backgroundColor: 'rgba(104, 99, 230, 0.8)'}}>
            <RankQuery columns={columns} data={data}/>
            </div>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    )
}