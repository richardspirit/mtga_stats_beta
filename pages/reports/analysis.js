import Head from 'next/head'
import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Analysis Reports</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Analysis Reports</h1>

        <div className={styles.grid}>
          <a href="gamemenu" className={styles.card}>
            <h2>Games By Day &rarr;</h2>
            <p>Analyze wins and loses by day of the week.</p>
          </a>

          <a href="gamesreason" className={styles.card}>
            <h2>Games By Reason &rarr;</h2>
            <p>Analyze wins and loses by reason.</p>
          </a>

          <a
            href="gamestime" className={styles.card}
          >
            <h2>Games By Time &rarr;</h2>
            <p>Analyze wins and loses by time of day.</p>
          </a>

          <a
            href="gameslevel"
            className={styles.card}
          >
            <h2>Games By Level/Tier &rarr;</h2>
            <p>Analyze wins and loses by Level/Tier.</p>
          </a>

          <a
            href="deletedecks"
            className={styles.card}
          >
            <h2>Delete Recommendations &rarr;</h2>
            <p>Decks recommended to be deleted due to low win ratio.</p>
          </a>

          <a
            href="deckcards"
            className={styles.card}
          >
            <h2>Decks By Number of Cards &rarr;</h2>
            <p>Analyze wins and loses by total card number.</p>
          </a>

          <a
            href=''
            className={styles.card}
          >
            <h2>Custom Reports</h2>
            <p>Create your own reports.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
