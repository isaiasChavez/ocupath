import React,{ useContext, useEffect,useState } from 'react';
import { withStyles,Theme,createStyles,makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { COLORS, FILES, URLS,FILES_TYPES } from '../../types'
import Grid from "@material-ui/core/Grid";
import { Box,Button, Card } from '@material-ui/core';
import clienteAxios from '../../config/axios';
import UserContext from '../../context/user/user.context';
import AssetsContext, { Asset } from '../../context/assets/assets.context';
interface StyledTabProps {
  label: string;
}
export interface TableFilesProps {

}
const img_uno = 'https://images.unsplash.com/photo-1623835255306-868c63d9335e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
const img_dos = 'https://images.unsplash.com/photo-1624548955817-e2d68f404137?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=670&q=80'
const img_tres = 'https://images.unsplash.com/photo-1624541478061-2a3b39b3d725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'

const TableFiles: React.FC<TableFilesProps> = () => {
  const [currentTab,setCurrentTab] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>,newValue: number) => {
    setCurrentTab(newValue);
  };
  const classes = useStyles();
  useEffect(() => {
    getAssetsUser()
  },[currentTab])
  const {getAssetsUser} = useContext(AssetsContext)
  return (
    <Grid container className={ classes.root } >
      <Grid item xs={ 12 }>
        <Paper className={ classes.paper }>
          <AntTabs value={ currentTab } onChange={ handleChange } aria-label="ant example">
            <AntTab label="Images" />
            <AntTab label="360 Images" />
            <AntTab label="Video" />
            <AntTab label="360 Videos" />
          </AntTabs>
          { currentTab === FILES.IMG && <Img /> }
          { currentTab === FILES.IMG_360 && <Img360 /> }
          { currentTab === FILES.VIDEO && <Video /> }
          { currentTab === FILES.VIDEO_360 && <Video360 /> }
        </Paper>
      </Grid>
    </Grid>

  );
}

export default TableFiles;



const Img: React.FC<ImgProps> = () => {
  const {assets,successCreate} = useContext(AssetsContext)  
  const classes = useStyles();

  const [files,setFiles] = useState([])
  useEffect(() => {
    if (files.length !== 0) {
      setImage()
    }
  },[files])
  const uploadImage = (data) => {
    setFiles(data)
  }
  const setImage = async () => {
    try {
      const selectedFile = files[0];
      const formData = new FormData()
      formData.append("upload",selectedFile)
      const response = await clienteAxios.post(URLS.urlUploadImage,formData)
      const DTO = {
        "url":response.data,
        "typeAsset":FILES_TYPES.IMG
      }
      const responseUploadUser = await clienteAxios.post(URLS.createAsset,DTO)
      console.log({responseUploadUser})
      if (responseUploadUser.data.status ===0) {
        successCreate(responseUploadUser.data.asset)
      }
    } catch (error) {
      console.log({ error })
      alert("Ha ocurrido un error al subir las imagenes")
    }
  }
  return (
    <>
      <GridList cellHeight={ 100 } className={ classes.gridList } cols={ 7 }>
        { assets.images.map((asset:Asset,i) => (
          <GridListTile key={ i } cols={ 1 } style={ { height: 180 } }>
            <img src={ asset.url } alt={ "Imagen normal" } />
          </GridListTile>
        )) }
      </GridList>
      <Paper>
        <Box display="flex" justifyContent="flex-end" alignItems="center" className={ classes.containerUpload }>
          <input onChange={ (e) => uploadImage(e.target.files) } multiple accept="image/*" id="upload" type="file" />
          <label htmlFor="upload">
            <Button variant="contained" color="primary" className={ classes.uploadButton } component="span">
              Upload
            </Button>
          </label>
        </Box>
      </Paper>
    </>
  );
}

export interface Img360Props {

}

const Img360: React.FC<Img360Props> = () => {

  const [files,setFiles] = useState([])
  const {assets,successCreate} = useContext(AssetsContext)

  useEffect(() => {
    if (files.length !== 0) {
      setImage()
    }
  },[files])
  const classes = useStyles();

  const uploadImage = (data) => {
    setFiles(data)
  }
  const setImage = async () => {
    try {
      const selectedFile = files[0];
      const formData = new FormData()
      formData.append("upload",selectedFile)
      const response = await clienteAxios.post(URLS.urlUploadImage360,formData)
      const DTO = {
        "url":response.data,
        "typeAsset":FILES_TYPES.IMG_360
      }
      const {data} = await clienteAxios.post(URLS.createAsset,DTO)
      if (data.status ===0) {
        successCreate(data.asset)
      }
    } catch (error) {
      console.log({ error })
      alert("Ha ocurrido un error al subir las imagenes")
    }
  }

  return (
<>

      <GridList cellHeight={ 100 } className={ classes.gridList } cols={ 7 }>
        { assets.images360.map((asset:Asset) => (
          
          <GridListTile key={ asset.url } cols={ 1 } style={ { height: 180 } }>
            <img src={ asset.url } alt="Imagen 360" />
          </GridListTile>
        ))
      }
      </GridList>
      <Paper>
        <Box display="flex" justifyContent="flex-end" alignItems="center" className={ classes.containerUpload }>
          <input onChange={ (e) => uploadImage(e.target.files) } accept="image/*" id="image360_uploader" type="file" />
          <label htmlFor="image360_uploader">
            <Button variant="contained" color="primary" className={ classes.uploadButton } component="span">
              Upload img 360
            </Button>
          </label>
        </Box>
      </Paper>
      </>
  );
}


export interface Video360Props {

}

const Video360: React.FC<Video360Props> = () => {
  const classes = useStyles();
  const {assets,successCreate} = useContext(AssetsContext)  
  const [files,setFiles] = useState([])

  useEffect(() => {
    if (files.length !== 0) {
      setVideo360()
    }
  },[files])
  const uploadVideo360 = (data) => {
    setFiles(data)
  }
  const setVideo360 = async () => {
    try {
      const selectedFile = files[0];
      console.log({selectedFile})
      const formData = new FormData()
      formData.append("upload",selectedFile)
      const response = await clienteAxios.post(URLS.urlUploadVideo360,formData)
      console.log({response})
      const DTO = {
        "url":response.data,
        "typeAsset":FILES_TYPES.VIDEO_360
      }
      const {data} = await clienteAxios.post(URLS.createAsset,DTO)
      console.log({data})
      if (data.status ===0) {
        successCreate(data.asset)
      }
    } catch (error) {
      console.log({ error })
      alert("Ha ocurrido un error al subir las imagenes")
    }
  }
  

  return (
    <>
      <GridList cellHeight={ 100 } className={ classes.gridList } cols={ 7 }>
        { assets.videos360.map((asset:Asset,i) => (
          <GridListTile key={ i } cols={ 1 } style={ { height: 180 } }>
            <img src={ asset.thumbnail }  />
          </GridListTile>
        )) }
      </GridList>
      <Paper>
        <Box display="flex" justifyContent="flex-end" alignItems="center" className={ classes.containerUpload }>
          <input onChange={ (e) => uploadVideo360(e.target.files) } accept="video/*" id="upload" type="file" />
          <label htmlFor="upload">
            <Button variant="contained" color="primary" className={ classes.uploadButton } component="span">
              Upload video 360
            </Button>
          </label>
        </Box>
      </Paper>
    </>
  );
}

export interface VideoProps {

}

const Video: React.FC<VideoProps> = () => {
  const {assets,successCreate} = useContext(AssetsContext)
  const [files,setFiles] = useState([])
  const [urlVideo, setUrlVideo] = useState<string>("")
  const [urlThumbNail, setUrlThumbNail] = useState<string>("")

  useEffect(() => {
    if (files.length !== 0) {
      setVideo()
    }
  },[files])
  const uploadVideo = (filesUploaded) => {
    const url = URL.createObjectURL(filesUploaded[0])
    setUrlVideo(url)
    setFiles(filesUploaded)

  } 

  const onLoadMetadata= ()=>{
    const _VIDEO = document.querySelector("#video-element") as HTMLVideoElement
    const _CANVAS = document.querySelector("#canvas-element") as HTMLCanvasElement
    _CANVAS.width = _VIDEO.videoWidth;
    _CANVAS.height = _VIDEO.videoHeight;
  }
  const onTimeUpdate = () => {
    const _VIDEO = document.querySelector("#video-element") as HTMLVideoElement
    const _CANVAS = document.querySelector("#canvas-element") as HTMLCanvasElement
    const _CANVAS_CTX = _CANVAS.getContext("2d")  
    _CANVAS_CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
    _VIDEO.currentTime = 3
    setUrlThumbNail(_CANVAS.toDataURL())
  }

  const setVideo = async () => {
    try {
      const selectedFile = files[0];
      const formData = new FormData()
      formData.append("upload",selectedFile)
      const response = await clienteAxios.post(URLS.urlUploadVideo,formData)
      const DTO = {
        "url":response.data,
        "typeAsset":FILES_TYPES.VIDEO
      }
      const {data} = await clienteAxios.post(URLS.createAsset,DTO)
      console.log({data})
      if (data.status ===0) {
        successCreate(data.asset)
      }

    } catch (error) {
      console.log({ error })
      alert("Ha ocurrido un error al subir las imagenes")
    }
  }
  const classes = useStyles();
  return (
    <>
      <GridList cellHeight={ 100 } className={ classes.gridList } cols={ 7 }>
        { assets.videos.map((video,i) => (
          <GridListTile key={ i } cols={ 1 } style={ { height: 180 } }>
            <img src={ video.thumbnail } alt={ `Video ${i}` } />
          </GridListTile>
        )) }
      </GridList>
      <Paper>
        <Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center" className={ classes.containerUpload }>
          <input onChange={ (e) => uploadVideo(e.target.files) } accept="video/*" id="video_uploader" type="file" />
          <label htmlFor="video_uploader">
            <Button variant="contained" color="primary" className={ classes.uploadButton } component="span">
              Upload video
            </Button>
          </label>
          {/* <video style={{ 
            
            height:'200px',width:'200px',
      backgroundColor:'red',
      display: 'hidden',
      visibility: 'hidden'
    }}  onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadMetadata} id="video-element" src={urlVideo} controls>
        <source src={urlVideo} type="video/mp4"/>
    </video>
    <canvas 
    style={{ 
      backgroundColor:'red',
      display: 'hidden',
      visibility: 'hidden'
    }}  id="canvas-element"></canvas>
    <div id="thumbnail-container">
         Seek to <select id="set-video-seconds"></select> seconds <a id="download-link" href="#">Download Thumbnail</a>
    </div> */}
        </Box>
      </Paper>
    </>
  );
}


export interface ImgProps {

}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    borderBottom: '2rem solid',
    borderTopColor: COLORS.GRAY_MEDIUM,
    borderBottomColor: COLORS.GRAY_MEDIUM
  },
  paper: {
    height: '100%'
  },
  containerUpload: {
    padding: '1rem'
  },
  uploadButton: {
    marginLeft: '1rem'
  },
  gridList: {
    width: '100%',
    height: '90%',
  },
}));


const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple { ...props } />);


