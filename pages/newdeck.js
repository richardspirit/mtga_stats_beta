import Link from "next/link";
import {useFilePicker} from 'use-file-picker';
import { useState } from "react";
import styles from '../styles/Home.module.css'
let endpoint = "http://localhost:8080";

export default function NewDeck(){
    const url = endpoint + "/api/newdeck";
    const [textInputName, setTextInputName] = useState('');

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

    const urlImport = endpoint + "/api/importdeck"
    const [openFileSelector, {filesContent, errors, loading, plainFiles}] = useFilePicker({
        multiple: false,
        accept: ['.txt']
    });

    if (errors.length > 0) return <p>Error!</p>;

    if (loading){
        return <div>Loading...</div>
    }

    let fileName = JSON.stringify(plainFiles);
    let fn = ''

    for (let i = 0;i<fileName.length;i++){
        if (i>9){
            if (fileName[i] === `"`){
                break
            } else {
                fn = fn + fileName[i];   
            }            
        }
    }

    const checkTextInput = () => {
        if (!textInputName.trim()){
            alert("Name Required");
            return false;
        } else {
            return true;
        }
    }

    const handleClick = async event => {
        event.preventDefault();
        if (checkTextInput()){
            const importDeck = textInputName + '_' + fn;
            const res  = fetch(urlImport, {
                body: JSON.stringify(importDeck),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
                })
                .catch(err => {
                    if (err){
                        alert(err)
                    }
                    console.log(err)
                })
                setTextInputName('');
        }
    }

    return (
        <>
        <main className={styles.main} style={{background: 'black', opacity: '90%', backgroundImage: `url("./lightning.jpg")`}}>
            <div>
                <h1 className={styles.title} style={{padding: '20px', color: 'black'}}>Create New Deck</h1>
            </div>
            <form onSubmit={createDeck} style={{minWidth: '1000px', minHeight: '220px', backgroundColor: 'grey', opacity: '85%'}}>
                <div className={styles.newdeck}>
                    <label htmlFor="name">
                        <span> Deck Name </span>
                        <input id="name" type="text" onChange={(e)=>setTextInputName(e.target.value)} value={textInputName} required />
                    </label>

                    <label htmlFor="colors">
                        <span> Colors </span>
                        <input id="colors" type="text" />
                    </label>
                    
                    <label htmlFor="favorite">
                        <span> Favorite </span>
                        <input id="favorite" type="text" defaultValue="No" style={{width: '40px'}} />
                    </label>
                </div>
                <div className={styles.newdeck}>
                    <label htmlFor="numcards">
                        <span> Total Number of Cards </span>
                        <input id="num_cards" type="text" defaultValue="0" style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numspells">
                        <span> Total Instant/Sorceries </span>
                        <input id="num_spells" type="text" defaultValue="0" style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numcreature">
                        <span> Total Creatures </span>
                        <input id="num_creat" type="text" defaultValue="0" style={{width: '40px'}}/>
                    </label>
                </div>
                <div className={styles.newdeck}>
                    <label htmlFor="numlands" style={{padding: '20px'}}>
                        <span> Total Lands </span>
                        <input id="num_lands" type="text" defaultValue="0" style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numenchant" style={{padding: '20px'}}>
                        <span> Total Enchantments </span>
                        <input id="num_enchant" type="text" defaultValue="0" style={{width: '40px'}}/>
                    </label>

                    <label htmlFor="numartifact" style={{padding: '20px'}}>
                        <span> Total Artifacts </span>
                        <input id="num_art" type="text" defaultValue="0" style={{width: '40px'}}/>
                    </label>
                </div>
                <div style={{textAlign: 'center', paddingBottom: '10px'}}>
                    <button type="submit">Submit</button>
                    <button onClick={() => openFileSelector()}>Get File</button>
                    <button onClick={handleClick}>File Submit</button>
                </div>
            </form>
            <Link href="/">
                <a style={{color: 'black'}}>Back Home</a>
            </Link>
        </main>
        </>
    )
}