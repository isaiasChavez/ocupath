import Head from "next/head";
import Layout from "../../src/layouts/Layout";
import withAuth from "../../src/auth/WithAuth";


export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Layout>
      <Head>
        <title>Ocupath - Dashboard </title>
      </Head>
      <h2>Dashboard</h2>
    </Layout>
  );
};

export default withAuth(Dashboard);
