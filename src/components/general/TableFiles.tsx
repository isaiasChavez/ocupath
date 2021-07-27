import React,{ useContext, useEffect,useState } from 'react';
import { withStyles,Theme,createStyles,makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { COLORS, FILES, URLS } from '../../types'
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
    setCurrentImages(currentTab)
  },[currentTab])
  const {getAssetsUser} = useContext(AssetsContext)
  


  const setCurrentImages = (tab: number) => {
    // if (tab === FILES.IMG) {
    //   setCurrentData(tileData)
    // }
    // if (tab === FILES.IMG_360) {
    //   setCurrentData(IMG_360_DATA)
    // }
    // if (tab === FILES.VIDEO) {
    //   setCurrentData(tileData)
    // }
    // if (tab === FILES.VIDEO_360) {
    //   setCurrentData(IMG_360_DATA)
    // }
  }
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
  const {assets} = useContext(AssetsContext)

  console.log("Img:",{assets})
  
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
      const response = await clienteAxios.post('api/upload/4',formData)
      const DTO = {
        "url":response.data,
        "typeAsset":1
      }
      const responseUploadUser = await clienteAxios.post(URLS.createAsset,DTO)
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



export interface Video360Props {

}

const Video360: React.FC<Video360Props> = () => {
  const classes = useStyles();
  const {assets} = useContext(AssetsContext)

  const VIDEO_360_DATA = 
    {
      img: img_tres,
      title: 'Image',
      author: 'author',
      cols: 2,
    }

  
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
      const response = await clienteAxios.post('api/upload/4',formData)
      console.log({response})
      const DTO = {
        "url":response.data,
        "typeAsset":4
      }
      const responseUploadUser = await clienteAxios.post(URLS.createAsset,DTO)
    } catch (error) {
      console.log({ error })
      alert("Ha ocurrido un error al subir las imagenes")
    }
  }
  

  return (
    <>
      <GridList cellHeight={ 100 } className={ classes.gridList } cols={ 7 }>
        { assets.videos360.map((asset,i) => (
          <GridListTile key={ i } cols={ 1 } style={ { height: 180 } }>
            <img src={ VIDEO_360_DATA.img }  />
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
  const VIDEO_DATA = [
    {
      img: img_dos,
      title: 'Image',
      author: 'author',
      cols: 2,
    }
  ];
  const {assets} = useContext(AssetsContext)

  const [files,setFiles] = useState([])

  useEffect(() => {
    if (files.length !== 0) {
      setVideo()
    }
  },[files])
  const uploadVideo = (data) => {
    setFiles(data)
  }
  const setVideo = async () => {
    try {
      const selectedFile = files[0];
      console.log({selectedFile})
      const formData = new FormData()
      formData.append("upload",selectedFile)
      const response = await clienteAxios.post('api/upload/4',formData)
      console.log({response})
      const DTO = {
        "url":response.data,
        "typeAsset":3
      }
      const responseUploadUser = await clienteAxios.post(URLS.createAsset,DTO)
    } catch (error) {
      console.log({ error })
      alert("Ha ocurrido un error al subir las imagenes")
    }
  }
  const classes = useStyles();


  return (
    <>

      <GridList cellHeight={ 100 } className={ classes.gridList } cols={ 7 }>
        { VIDEO_DATA.map((tile) => (
          <GridListTile key={ tile.img } cols={ 1 } style={ { height: 180 } }>
            <img src={ tile.img } alt={ tile.title } />
          </GridListTile>
        )) }
      </GridList>
      <Paper>
        <Box display="flex" justifyContent="flex-end" alignItems="center" className={ classes.containerUpload }>
          <input onChange={ (e) => uploadVideo(e.target.files) } accept="video/*" id="video_uploader" type="file" />
          <label htmlFor="video_uploader">
            <Button variant="contained" color="primary" className={ classes.uploadButton } component="span">
              Upload video
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
  const {assets} = useContext(AssetsContext)

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
      const response = await clienteAxios.post('api/upload/4',formData)
      const DTO = {
        "url":response.data,
        "typeAsset":1
      }
      const responseUploadUser = await clienteAxios.post(URLS.createAsset,DTO)
    } catch (error) {
      console.log({ error })
      alert("Ha ocurrido un error al subir las imagenes")
    }
  }

  const IMG_360_DATA = [
    {
      img: img_uno,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
  ];

  return (
    <Card className={ classes.root }>


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
          <input onChange={ (e) => uploadImage(e.target.files) } accept="image/*" id="video360_uploader" type="file" />
          <label htmlFor="video360_uploader">
            <Button variant="contained" color="primary" className={ classes.uploadButton } component="span">
              Upload img 360
            </Button>
          </label>
        </Box>
      </Paper>
      </Card>
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


