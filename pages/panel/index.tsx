import withAuth from "../../src/auth/WithAuth";
import Navigation from "../../src/components/Navigation";
import Layout from "../../src/layouts/Layout";

export interface PanelProps {}

const Panel: React.FC<PanelProps> = () => {
  return (
    <>
      <Navigation isPanel={true} />
      <h3>Panel</h3>
    </>
  );
};
export default withAuth(Panel);

