import React,{ useContext,useEffect,useState } from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import FormEdit from './FormEdit';
import { COLORS } from '../../types';
import UserContext,{ UpdateUserDTO } from '../../context/user/user.context';
import { Button,Grid,IconButton } from '@material-ui/core';
import AskModal from './AskModal';
import axios from 'axios';
const EditUser: React.FC<EditUserProps> = ({ type ,isEditingAvatar,setIsEditingAvatar}) => {
  const { getUserDetail } = useContext(UserContext)
  const classes = useStyles();
  useEffect(() => {
    getUserDetail()
  },[])
  

  const toggleEditAvatar = () => {
    setIsEditingAvatar(!isEditingAvatar)
  }

  return (
    <Card className={ classes.root }>
      { !isEditingAvatar && <EditCard toggleEditAvatar={ toggleEditAvatar } type={ type } /> }
      { isEditingAvatar && <EditAvatar toggleEditAvatar={ toggleEditAvatar } /> }
    </Card>
  );
}


const EditCard: React.FC<EditCardProps> = ({ type,toggleEditAvatar }) => {
  const { profile } = useContext(UserContext)
  console.log({profile})
  return (<>
    <FormEdit type={ type } toggleEditAvatar={toggleEditAvatar} />
  </>);
}



const EditAvatar = ({ toggleEditAvatar }) => {
  const iframeUrl = "https://ocupath.readyplayer.me/"
  const thumbnailUrl = "https://render.readyplayer.me/render"
  const classes = useStyles();
  const [isModalVisible,setIsModalVisible] = useState(false)
  const { updateUser } = useContext(UserContext)
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
    setIsModalVisible(false)
    const { data } = await axios.post(thumbnailUrl,{
      "model": urlAvatar,
      "scene": "halfbody-portrait-v1"
    })
    const updateUserDto = new UpdateUserDTO({
      avatar: urlAvatar,
      name: null,
      thumbnail: data.renders[0]
    })
    await updateUser(updateUserDto)

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
        title="SAVE AVATAR"
        handleClose={ onCancelAvatar }
        handleOk={ onSaveAvatar }
        subtitle="Are you sure you want to save these changes?"
      />
      <div className={ classes.rootIframe } >
        <div className={ classes.header }>
          <IconButton onClick={ toggleEditAvatar } aria-label="delete">
            <ArrowBack />
          </IconButton>
        </div>
        <iframe className={ classes.iframe } src={ iframeUrl }>
        </iframe>
        <div className={ classes.button }>
          { urlAvatar !== null && <Button onClick={ () => setIsModalVisible(true) } variant="contained" href="#contained-buttons">
            Save Changes
          </Button> }
        </div>
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
    flexDirection: 'column',
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '82%',
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

interface EditUserProps {
  type: number,
  isEditingAvatar:boolean,
  setIsEditingAvatar:Function,
}
export interface EditCardProps {
  type: number,
  toggleEditAvatar: any,
}
export default EditUser