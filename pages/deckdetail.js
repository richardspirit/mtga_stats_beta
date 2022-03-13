import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from '../styles/Home.module.css';
import React from 'react';
import RankQuery from "./api/resultquery";
// import Layout from "../components/layout";

export default function DeckDetail() {
    const columns = React.useMemo(
        () => [
            {
                Header: "Deck",
                accessor: "deck"
            },
            {
                Header: "Total Cards",
                accessor: "totalcards"
            },
            {
                Header: "Total Creatures",
                accessor: "totalcreat"
            },
            {
                Header: "Max Streak",
                accessor: "maxstreak"
            },
            {
                Header: "Color/s",
                accessor: "color"
            },
            {
                Header: "Total Lands",
                accessor: "total_lands"
            },
            {
                Header: "Total Enchantments",
                accessor: "totalenchant"
            },
            {
                Header: "Current Streak",
                accessor: "curstreak"
            },
            {
                Header: "Date Entered",
                accessor: "date_entered"
            },
            {
                Header: "Total Instants/Sorcery",
                accessor: "totalspells"
            },
            {
                Header: "Total Artifacts",
                accessor: "totalartifact"
            },
            {
                Header: "Favorite",
                accessor: "favorite"
            }
        ],[]
    );

    const data = React.useMemo(
        () => [
            {
                deck: "test",
                totalcards: 21,
                totalcreat: 2,
                maxstreak: 3,
                color: "red",
                total_lands: 21,
                totalenchant: 2,
                curstreak: 3,
                date_entered: "11-14-2021",
                totalspells: 21,
                totalartifact: 2,
                favorite: "n"
            }
        ],[]
    );
    return (
        <>
            <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Deck Ranking</h1>
            </div>
            <RankQuery columns={columns} data={data}/>
            <Link href="/">
                <a>Back Home</a>
            </Link>
            </main>
        </>
    )
}