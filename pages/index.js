import Head from "next/head";
import Link from "next/link";
import Alert from "../components/alert/alert";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

const type = "";

export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>ピスピース☆ ゴルシちゃんだぞー♪</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{" "}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
        <Link href="/posts/first-post">
          <a>first post →</a>
        </Link>
      </Layout>
      <Alert type={type}>
        <p>
          developer
          toolでAlertコンポーネントのtypeに'success'か'error'を入れると色が変わります
        </p>
      </Alert>
      <h1 className="text-3xl">this part is styled by tailwindcss.</h1>
    </>
  );
}
