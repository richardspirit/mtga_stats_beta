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
                Header: "Total Cards", accessor: "cardtotal",
            },
            {
                Header: "Land Total", accessor: "landtotal",
            },
            {
                Header: "Spell Total", accessor: "spelltotal",
            },
            {
                Header: "Creature Total", accessor: "creaturetotal",
            },
            {
                Header: "Enchantment Total", accessor: "enchanttotal",
            },
            {
                Header: "Artifact Total", accessor: "artifacttotal",
            },
            {
                Header: "Wins", accessor: "wins",
            },
            {
                Header: "Loses", accessor: "loses",
            }
        ],[]);
    
    const [Rows, getRows] = useState([]);
    let url = endpoint + `/api/anal/deckbycards`;
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

    Rows.forEach(element => {
        const rowData = element.split("|");
        const rowObj = {};
        rowObj.cardtotal = rowData[0];
        rowObj.landtotal = rowData[1];
        rowObj.spelltotal = rowData[2];
        rowObj.creaturetotal = rowData[3];
        rowObj.enchanttotal = rowData[4];
        rowObj.artifacttotal = rowData[5];
        rowObj.wins = rowData[6];
        rowObj.loses = rowData[7];
        data.push(rowObj);
        //console.log(data)
    });

    return (
        <>
        <div className={styles.analysis}>
            <main className={styles.main}>
            <div>
                <h1 className={styles.analysis_title}>Wins/Loses By Card Total</h1>
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