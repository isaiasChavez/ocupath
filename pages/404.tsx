import { Box } from "@material-ui/core";
import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { Images } from "../src/types";


export interface NotFoundProps {
 
}
 
const NotFound: React.FC<NotFoundProps> = () => {
  const router = useRouter();

 return (  
  
  <Box  flexDirection="column" display="flex" justifyContent="center" alignItems="center"  width="100%"  height="100vh">
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() =>router.push("/")}>Back Home</Button>}
  />,
  </Box>
 );
}
 
export default NotFound;