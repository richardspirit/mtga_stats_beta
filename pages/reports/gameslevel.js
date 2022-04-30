import Link from "next/link";
import styles from '../../styles/Home.module.css';
import React, {useState, useEffect, useMemo} from 'react';
import TableContainer from "../api/sort-table";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://localhost:8080";

export default function GamesLevel() {
    const columns = useMemo (()=>[
            {
                Header: "Deck", accessor: "deck",
            },
            {
                Header: "Opponent", accessor: "opponent",
            },
            {
                Header: "Level", accessor: "level",
            },
            {
                Header: "Reason", accessor: "reason",
            },
            {
                Header: "Result", accessor: "result"
            }
        ],[]);
    
    const [Rows, getRows] = useState([]);
    let url = endpoint + `/api/anal/gamesbylevel`;
    const data = [];
    const getData = () => {
        fetch(url).then((res) => res.json())
            .then((res) => {
                getRows(res);
                console.log(Rows)
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
            rowObj.opponent = rowData[1];
            rowObj.level = rowData[2];
            rowObj.reason = rowData[3];
            rowObj.result = rowData[4];
            data.push(rowObj);
            //console.log(data)
        });
    }

    return (
        <>
        <div className={styles.analysis}>
            <main className={styles.main}>
            <div>
                <h1 className={styles.analysis_title}>Wins/Loses By Level/Tier</h1>
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