import Link from "next/link";
import styles from '../styles/Home.module.css'
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function NewDeck(){
    const url = endpoint + "/api/newdeck";

    const createDeck = async event => {
        event.preventDefault();
        let fav
        if (event.target.favorite.value === "Yes"){
            fav = 0;
        } else {
            fav = 1;
        }

        const res  = await fetch(url, {
            body: JSON.stringify({
                name: event.target.name.value,
                colors: event.target.colors.value,
                favorite: fav,
                num_cards: event.target.num_cards.value,
                num_spells: event.target.num_spells.value,
                num_creat: event.target.num_creat.value,
                num_lands: event.target.num_lands.value,
                num_enchant: event.target.num_enchant.value,
                num_art: event.target.num_art.value
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
            })
            .catch(err => {
                if (err){
                    alert("Deck Already Exists")
                }
                //console.log(err)
            })

            //const result = await res.json();

            event.target.name.value = "";
            event.target.colors.value = "";
            event.target.favorite.value = "No";
            event.target.num_cards.value = "0";
            event.target.num_spells.value = "0";
            event.target.num_creat.value = "0";
            event.target.num_lands.value = "0";
            event.target.num_enchant.value = "0";
            event.target.num_art.value = "0";
    }

    return (
        <>
        <main className={styles.main}>
            <div>
                <h1 className={styles.title}>Create New Deck</h1>
            </div>
            <form onSubmit={createDeck}>
                <div className={styles.grid}>

                    <label htmlFor="name">
                        <span>Deck Name </span>
                        <input id="name" type="text" required />
                    </label>

                    <label htmlFor="colors">
                        <span>Colors </span>
                        <input id="colors" type="text" />
                    </label>
                    
                    <label htmlFor="favorite" >
                        <span>Favorite </span>
                        <input id="favorite" type="text" defaultValue="No" />
                    </label>
                    
                    <label htmlFor="numcards">
                        <span>Total Number of Cards </span>
                        <input id="num_cards" type="text" defaultValue="0" />
                    </label>

                    <label htmlFor="numspells">
                        <span>Total Instant/Sorceries </span>
                        <input id="num_spells" type="text" defaultValue="0" />
                    </label>

                    <label htmlFor="numcreature">
                        <span>Total Creatures </span>
                        <input id="num_creat" type="text" defaultValue="0" />
                    </label>

                    <label htmlFor="numlands">
                        <span>Total Lands </span>
                        <input id="num_lands" type="text" defaultValue="0" />
                    </label>

                    <label htmlFor="numenchant">
                        <span>Total Enchantments </span>
                        <input id="num_enchant" type="text" defaultValue="0" />
                    </label>

                    <label htmlFor="numartifact">
                        <span>Total Artifacts </span>
                        <input id="num_art" type="text" defaultValue="0" />
                    </label>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link href="/">
                <a>Back Home</a>
            </Link>
        </main>
        </>
    )
}