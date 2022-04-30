import Link from "next/link";
import styles from '../../styles/Home.module.css';
import React, {useState, useEffect, useMemo} from 'react';
import TableContainer from "../api/sort-table";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://localhost:8080";

export default function GamesReason() {
    const columns = useMemo (()=>[
            {
                Header: "Deck", accessor: "deck",
            },
            {
                Header: "Reason", accessor: "reason",
            },
            {
                Header: "Results", accessor: "results",
            }
        ],[]);
    
    const [Rows, getRows] = useState([]);
    let url = endpoint + `/api/anal/gamesbyreason`;
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
            const rowObj = {};
            rowObj.deck = rowData[0];
            rowObj.reason = rowData[1];
            rowObj.results = rowData[2];  
            data.push(rowObj);
            //console.log(data)
        });
    }

    return (
        <>
        <div className={styles.analysis}>
            <main className={styles.main}>
            <div>
                <h1 className={styles.analysis_title}>Wins/Loses Reasons</h1>
            </div>
            <Container style={{ marginTop: 100 }}>
                <TableContainer columns={columns} data={data} />
            </Container>
            </main>
                <footer className={styles.footer}>
                    <Link href="analysis">
                        <a>Back</a>
                    </Link>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </footer>
        </div>
        </>
    );
}