import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Analysis Reports For Games By Day</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Analysis Reports For Games By Day</h1>

        <div className={styles.grid}>
          <a href="games" className={styles.card}>
            <h2>Best/Worst Games By Day &rarr;</h2>
            <p>Analyze best and worst days by loses/wins by day.</p>
          </a>

          <a href="gamesday" className={styles.card}>
            <h2>Games By Day of The Week &rarr;</h2>
            <p>Analyze wins and loses by day of the Week.</p>
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
            href='deckcreatures'
            className={styles.card}
          >
            <h2>Deck By Number of Creatures</h2>
            <p>Analyze wins and loses by total number of creatures.</p>
          </a>

          <a
            href='decknoncreatures'
            className={styles.card}
          >
            <h2>Decks By Number Non-Creatures</h2>
            <p>Analyze wins and loses by total number of non-creatures.</p>
          </a>

          <a
            href='decklands'
            className={styles.card}
          >
            <h2>Decks By Number of Lands</h2>
            <p>Analyze wins and loses by total number of lands.</p>
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
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}