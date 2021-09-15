import { Box } from "@material-ui/core";
import { useContext, useState } from "react";
import AssetsContext from "../../context/assets/assets.context";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'

interface MaxViewerProps {
 closeMaxViewer:Function
}
 
const MaxViewer: React.FC<MaxViewerProps> = ({closeMaxViewer}) => {
 const {currentAsset} = useContext(AssetsContext)
 const [isHoveringImage, setisHoveringImage] = useState(false)
 return (  <>
 <Box
        position='fixed'
        zIndex={300}
        display='flex'
        justifyContent='center'
        alignItems='center'
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}
        onClick={()=>{if (!isHoveringImage)closeMaxViewer()}}
      >
        <Box height="90%" width="90%" display="flex" justifyContent="center" >
         <Box position="relative">
          <FullscreenExitIcon
           onClick={()=>{if (!isHoveringImage)closeMaxViewer()}}
           style={{ cursor:'pointer',position:'absolute', top:0,right:0, color:'white',fontSize:'2rem',marginTop:'1rem',marginRight:'1rem'}}/>

          <img src={currentAsset.url} 
          onMouseEnter={()=>setisHoveringImage(true)}
          onMouseLeave={()=>setisHoveringImage(false)}
           style={{
            height: '100%',
            objectFit: 'contain'
           }}
           alt="Preview de una imagen" />
           </Box>
        </Box>
      </Box>

 </>);
}
 
export default MaxViewer;