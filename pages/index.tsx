import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Practicegenius Post Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a
            href="https://media.giphy.com/media/U4DswrBiaz0p67ZweH/giphy.gif"
            target="_blank"
            rel="noopener nofollow"
          >
            The Party!
          </a>
        </h1>

        <p className={styles.description}>
          Refer to
          <code className={styles.code}>README.md</code>
          in the repository for the challenge instructions
        </p>

        <h2>Good Luck!</h2>
      </main>
    </div>
  );
};

export default Home;
