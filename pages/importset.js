import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import RankQuery from "./api/resultquery";
import {useFilePicker} from 'use-file-picker';
// import Layout from "../components/layout";
let endpoint = "http://localhost:8080";

export default function ImportSet() {

    const url = endpoint + "/api/importset";
    const [openFileSelector, {filesContent, errors, loading, plainFiles}] = useFilePicker({
        multiple: false,
        accept: ['.txt', '.json']
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
    
    const handleClick = async event => {
        event.preventDefault();
        const res  = fetch(url, {
            body: JSON.stringify(fn),
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
    }
    

    return (
        <>
            <main className={styles.main} style={{backgroundImage: `url("./")`, backgroundSize: 'cover'}}>
            <div>
                <h1 className={styles.title} style={{backgroundColor: ''}}> Import Card Sets </h1>
            </div>
            <div style={{backgroundColor: ''}}>
            <button onClick={() => openFileSelector()}>Open File</button>
            </div>
            <div>
                <button onClick={handleClick}>Import</button>
            </div>
            <div>
                {filesContent.map((file, index) => (
                <div>
                    <h2>{file.name}</h2>
                    <div key={index}>{file.content}
                </div>
                <br />
            </div>
      ))}
  );
            </div>
            <Link href="/">
                <a style={{color: 'black'}}>Back Home</a>
            </Link>
            </main>
        </>
    )
}