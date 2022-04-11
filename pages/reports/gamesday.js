import Link from "next/link";
import styles from '../../styles/Home.module.css';
import React, {useState, useEffect, useMemo} from 'react';
import TableContainer from "../api/sort-table";
import { Container } from "reactstrap";
import { Helmet } from 'react-helmet';
import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://localhost:8080";

export default function Games() {
    const columns = useMemo (()=>[
            {
                Header: "Day", accessor: "day",
            },
            {
                Header: "Deck", accessor: "deck",
            },
            {
                Header: "Wins", accessor: "wins",
            },
            {
                Header: "Loses", accessor: "loses",
            }
        ],[]);
    
    const [Rows, getRows] = useState([]);
    let url = endpoint + `/api/anal/gamesbydayweek`;
    const data = [];
    const getData = () => {
        fetch(url).then((res) => res.json())
            .then((res) => {
                getRows(res);
            })
    };

    useEffect(() => {
        getData();
    },[]);

    Rows.forEach(element => {
        const rowData = element.split("|");
        const rowObj = {};
        rowObj.day = rowData[0];
        rowObj.deck = rowData[1];
        rowObj.wins = rowData[2];
        rowObj.loses = rowData[3];    
        data.push(rowObj);
        //console.log(data)
    });

    return (
        <>
            <div className={styles.analysis}>
                <main className={styles.main}>
                    <div>
                        <h1 className={styles.analysis_title}>Wins/Loses By Day of the Week</h1>
                    </div>
                    <Container style={{ marginTop: 100 }}>
                        <TableContainer columns={columns} data={data} />
                    </Container>
                    <Link href="/">
                        <a>Back Home</a>
                    </Link>
                </main>
            </div>
        </>
    );
}