import Head from "next/head";
import Navigation from "../components/Navigation";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Head>
        <title>Ocupath Project</title>
        <link />
      </Head>
      <Navigation isPanel={false} />
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
