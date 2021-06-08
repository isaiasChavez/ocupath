import Head from "next/head";
import Image from "next/image";
import Layout from "../src/layouts/Layout";
import Navigation from "../src/components/Navigation";
import styles from "../styles/Home.module.css";
import UserState from "../src/context/user/user.state";
export default function Home() {
  return (
    <Layout>
      <UserState>
        <Head>
          <title>Ocupath - Home </title>
        </Head>
        <h3>indeasx</h3>
      </UserState>
    </Layout>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
