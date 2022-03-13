import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from '../styles/Home.module.css';
import React from 'react';
// import Layout from "../components/layout";

export default function NewGame() {
    const [value, setValue] = React.useState('gametype');
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
        <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Record New Game</h1>
            </div>
            <form>
                <div className={styles.grid}>

                    <label htmlFor="results">
                        <span>Results(win/lose) </span>
                        <input id="results" type="text" required />
                    </label>
                    
                    <label htmlFor="deckname" >
                        <span>Deck Name </span>
                        <input id="deckname" type="text" />
                    </label>
                    
                    <label htmlFor="oppname">
                        <span>Opponent Name </span>
                        <input id="oppname" type="text" />
                    </label>

                    <label htmlFor="gamelvl">
                        <span>Game Level </span>
                        <input id="gamelvl" type="text" />
                    </label>

                    <label htmlFor="tier">
                        <span>Tier: </span>
                        <input id="tier" type="text" />
                    </label>

                    <label>
                        Game Type:
                        <select value={value} onChange={handleChange}>
                            <option value="play">Play</option>
                            <option value="brawl">Brawl</option>
                            <option value="stanranked">Standard Ranked</option>
                            <option value="trstplay">Traditional Standard Play</option>
                            <option value="trstranked">Traditional Standard Ranked</option>
                            <option value="hisranked">Historic Ranked</option>
                            <option value="trhisranked">Traditional Historic Ranked</option>
                            <option value="hisbrawl">Historic Brawl</option>
                            <option value="bot">Bot</option>
                        </select>
                    </label>

                    <label htmlFor="reason">
                        <span>Reason: </span>
                        <textarea id="reason" required />
                    </label>
                </div>
            </form>
            <Link href="/">
                <a>Back Home</a>
            </Link>
        </main>
        </>
    )
}