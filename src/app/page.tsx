import Image from "next/image";
import styles from "./page.module.css";
import Forms from "./Components/Forms";

export default function Home() {
  return (
    <main className={styles.main}>
        <h1>npm run dev</h1>
        <Forms/>
    </main>
  );
}
