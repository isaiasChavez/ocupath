import Head from "next/head";
import withAuth from "../../src/auth/WithAuth";
import Layout from "../../src/layouts/Layout";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <Layout>
        <Head>
          <title>Ocupath - Home </title>
        </Head>
      </Layout>
    </div>
  );
};

export default withAuth(Home);
