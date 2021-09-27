import React,{ useContext,useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ArrowBack from '@material-ui/icons/ArrowBack';
import UserSection from './UserSection';
import { COLORS } from '../../types';
import UserContext,{ UpdateUserDTO } from '../../context/user/user.context';
import { Button,IconButton,Box, LinearProgress   } from '@material-ui/core';
import AskModal from './AskModal';
import axios from 'axios';
const Profile: React.FC<ProfileProps> = ({ type ,isEditingAvatar,setIsEditingAvatar}) => {
  const { getUserDetail } = useContext(UserContext)
  const classes = useStyles();
  
  useEffect(() => {
    getUserDetail()
  },[])

  const toggleAvatarSection = () => {
    setIsEditingAvatar(!isEditingAvatar)
  }

  return (
    <Card className={ classes.root }>
      { !isEditingAvatar && <UserSection toggleAvatarSection={ toggleAvatarSection } type={ type } /> }
      { isEditingAvatar && <AvatarSection toggleAvatarSection={ toggleAvatarSection } /> }
    </Card>
  );
}


const AvatarSection = ({ toggleAvatarSection }) => {
  const iframeUrl = "https://ocupath.readyplayer.me/"
  const thumbnailUrl = "https://render.readyplayer.me/render"
  const classes = useStyles();
  const [isModalVisible,setIsModalVisible] = useState(false)
  const { updateUser } = useContext(UserContext)
  const [loading, setloading] = useState(false)
  const [urlAvatar,setUrlAvatar] = useState<string>(null)
  const handleUrlAvatar = (event) => {
    if (iframeUrl.includes(event.origin)) {
      setUrlAvatar(event.data)
      setIsModalVisible(true)
    }

  }
  const onCancelAvatar = () => {
    setIsModalVisible(false)
  }
  const onSaveAvatar = async () => {
    try {
      setIsModalVisible(false)
      setloading(true)
      const { data } = await axios.post(thumbnailUrl,{
        "model": urlAvatar,
        "scene": "halfbody-portrait-v1"
      })
      const updateUserDto = new UpdateUserDTO({
        avatar: urlAvatar,
        name: null,
        thumbnail: data.renders[0],
        roomImage:null
      })
      const status = await updateUser(updateUserDto)
      setloading(false)
      if(status===0){
        toggleAvatarSection()
      }
      
    } catch (error) {
      setloading(false)
    }

  }


  useEffect(() => {
    window.addEventListener("message",handleUrlAvatar,false)
    return () => {
      window.removeEventListener("message",handleUrlAvatar)
    }
  },[])

  return (
    <>
      <AskModal
        cancelText="Cancel"
        okText="Sure"
        isOpen={ isModalVisible }
        title="Save Avatar"
        handleClose={ onCancelAvatar }
        handleOk={ onSaveAvatar }
        subtitle="Are you sure you want to save these changes?"
      />
      <div className={ classes.rootIframe } >
        <div className={ classes.header }>
          <IconButton onClick={ toggleAvatarSection } aria-label="delete">
            <ArrowBack />
          </IconButton>
        </div>
        <iframe
         title="iframe Example 2"
         
        className={ classes.iframe } src={ iframeUrl }>
        <p>Your browser does not support iframes.</p>
        </iframe>
        {loading&&<Box className={ classes.iframeCover}/>}
        {loading&&<LinearProgress />}

        <Box className={ classes.button }>
          { urlAvatar !== null && <Button
          color="secondary"
            style={{
              color:'white',
              textTransform: 'capitalize'
            }}
            disabled={loading}
           onClick={ () => onSaveAvatar() } variant="contained" href="#contained-buttons">
            Save Changes
          </Button> }
        </Box>
      </div>
    </>
  );
}




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    padding: '2rem',
  },
  rootIframe: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '82%',
  },
  iframeCover:{
    backgroundColor: 'white',
    opacity:'50%',
    position:'absolute',
    width: '100%',
    height: '90%'
  },
  header: {
    height: '8%',
  },
  button: {
    height: '10%',
    display: 'flex',
    paddingRight: '1rem',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonEdit: {
    fontSize: '0.75rem',
    textTransform: 'capitalize'
  },

  

}));

interface ProfileProps {
  type: number,
  isEditingAvatar:boolean,
  setIsEditingAvatar:Function,
}
export interface EditCardProps {
  type: number,
  toggleAvatarSection: any,
}
export default Profile