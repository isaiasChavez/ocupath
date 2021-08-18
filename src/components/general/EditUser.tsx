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
  const classes = useStyles();
  const { profile } = useContext(UserContext)
  console.log({profile})
  return (<>
    <CardContent >
      <Avatar src={ profile.thumbnail } alt="Remy Sharp" className={ classes.large } />
      <button onClick={ toggleEditAvatar } className={ classes.buttonEdit }>
        Edit Avatar
      </button>
    </CardContent>
    <FormEdit type={ type } />
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
    borderTop: '2rem solid',
    borderTopColor: COLORS.GRAY_MEDIUM,
    borderBottom: '2rem solid',
    borderBottomColor: COLORS.GRAY_MEDIUM
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
    borderColor: 'black',
    border: 'solid 1px',
    textalign: 'center',
    width: '100%',
    background: 'transparent',
    borderRadius: '19pt',
    paddingTop: '0.12rem',
    cursor: 'pointer',
    paddingBottom: '0.12rem',
    '&:hover': {
      background: '#eeee',
    },
  },

  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: '0.5rem',
    marginTop: '3rem',
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