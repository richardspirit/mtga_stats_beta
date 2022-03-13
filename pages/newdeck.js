import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from '../styles/Home.module.css'
// import Layout from "../components/layout";

export default function NewDeck(){
    return (
        <>
        <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Create New Deck</h1>
            </div>
            <form>
                <div className={styles.grid}>

                    <label htmlFor="name">
                        <span>Deck Name </span>
                        <input id="name" type="text" required />
                    </label>

                    <label htmlFor="colors">
                        <span>Colors </span>
                        <input id="colors" type="text" required />
                    </label>
                    
                    <label htmlFor="favorite" >
                        <span>Favorite </span>
                        <input id="favorite" type="text" />
                    </label>
                    
                    <label htmlFor="numcards">
                        <span>Total Number of Cards </span>
                        <input id="numcards" type="text" />
                    </label>

                    <label htmlFor="numspells">
                        <span>Total Instant/Sorceries </span>
                        <input id="numspells" type="text" />
                    </label>

                    <label htmlFor="numcreature">
                        <span>Total Creatures </span>
                        <input id="numcreature" type="text" />
                    </label>

                    <label htmlFor="numlands">
                        <span>Total Lands </span>
                        <input id="numlands" type="text" />
                    </label>

                    <label htmlFor="numenchant">
                        <span>Total Enchantments </span>
                        <input id="numenchant" type="text" />
                    </label>

                    <label htmlFor="numartifact">
                        <span>Total Artifacts </span>
                        <input id="numartifact" type="text" />
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