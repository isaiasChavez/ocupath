import { Box } from "@material-ui/core";
import { Images } from "../src/types";


export interface NotFoundProps {
 
}
 
const NotFound: React.FC<NotFoundProps> = () => {
 return (  
  
  <Box  flexDirection="column" display="flex" justifyContent="center" alignItems="center" bgcolor="primary.main" width="100%"  height="100vh">
   <Box display="flex" justifyContent="center" >

    <img src={Images.logo2x} alt="" />
   </Box>
    <Box textAlign="center" ml={2} fontSize={32} color="secondary.main">
      404 Page not found
    </Box>
  </Box>
 );
}
 
export default NotFound;