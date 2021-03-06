import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container} >
      <Head>
        <title>MTGA Stats App</title>
        <meta name="description" content="MTG Stats" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>MTGA Stats</h1>

        <div className={styles.grid}>
          <a href="newdeck" className={styles.card}>
            <h2>New Deck &rarr;</h2>
            <p>Import or Create a new deck.</p>
          </a>

          <a href="newgame" className={styles.card}>
            <h2>New Game &rarr;</h2>
            <p>Record the results of a new game.</p>
          </a>

          <a
            href="deckrank" className={styles.card}
          >
            <h2>Decks Rankings &rarr;</h2>
            <p>View current deck rankings.(Not MTGA Game rankings)</p>
          </a>

          <a
            href="gamecount"
            className={styles.card}
          >
            <h2>Game Count &rarr;</h2>
            <p>View total game count of each deck.</p>
          </a>

          <a
            href="viewdecks"
            className={styles.card}
          >
            <h2>View Decks &rarr;</h2>
            <p>View summary of all decks.
              <br />
              <br />
            </p>
          </a>

          <a
            href="topten"
            className={styles.card}
          >
            <h2>Top Ten Decks &rarr;</h2>
            <p>View decks with the top ten ranking.</p>
          </a>

          <a 
            href='deckdetail'
            className={styles.card}
          >
            <h2>Details/Edit Deck &rarr;</h2>
            <p>View deck details. Edit Decks.</p>
          </a>

          <a
            href='winpercent'
            className={styles.card}
          >
            <h2>Win Percent &rarr;</h2>
            <p>View win percentage of all decks.</p>
          </a>

          <a
            href='reports/analysis'
            className={styles.card}
          >
            <h2>Analysis &rarr;</h2>
            <p>View analysis reports on decks and games.
            </p>
          </a>

          <a
            href='favorites'
            className={styles.card}
          >
            <h2>Favorites &rarr;</h2>
            <p>View and set favorite decks from Top Ten.</p>
          </a>

          <a
            href='importset'
            className={styles.card}
          >
            <h2>Import Set Data &rarr;</h2>
            <p>Import set data for all cards.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
