import React, {  useContext, useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import { Space, Spin } from 'antd'
import { Popover, Button as ButtonAnt } from 'antd'
import Tab from '@material-ui/core/Tab'
import {
  COLORS,
  FILES,
  FILES_TYPES,
} from '../../types'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'
import AssetsContext, { Asset } from '../../context/assets/assets.context'
import Previwer from '../login/Previwer'
import ImgUploader from './ImgUploader'
import Img360Uploader from './Img360Ulploader'
import VideoUploader from './VideoUploader'
import Video360Uploader from './Video360Uploader'

interface StyledTabProps {
  label: string
}
export const Constants = {
  MB: 1e6
}
export const FilesConfiguration = {
  images: {
    minSize: Constants.MB * 1,
    maxSize: Constants.MB * 10,
    filesAcepted: 'image/jpeg, image/png'
  },
  images360: {
    minSize: Constants.MB * 1,
    //maxSize: Constants.MB * 4.5,
    maxSize: Constants.MB * 10,
    filesAcepted: 'image/jpeg, image/png'
  },
  videos: {
    minSize: Constants.MB * 100,
    maxSize: Constants.MB * 25,
    filesAcepted: 'video/mp4'
  },
  videos360: {
    minSize: Constants.MB * 100,
    maxSize: Constants.MB * 25,
    filesAcepted: 'video/mp4'
  },
  nameToUpload: 'upload'
}

export interface TableFilesProps {}
const TableFiles: React.FC<TableFilesProps> = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
  const classes = useStylesFiles()
  useEffect(() => {
    getAssetsUser()
  }, [currentTab])
  const { getAssetsUser, isPreviewerOpened } = useContext(AssetsContext)

  const [loading, setLoading] = useState(false)
  const Tabs = {}
  Tabs[FILES.IMG] = <ImgUploader loading={loading} setLoading={setLoading} />
  Tabs[FILES.IMG_360] = <Img360Uploader loading={loading} setLoading={setLoading} />
  Tabs[FILES.VIDEO] = <VideoUploader loading={loading} setLoading={setLoading} />
  Tabs[FILES.VIDEO_360] = <Video360Uploader loading={loading} setLoading={setLoading} />

  return (
    <>
      {isPreviewerOpened && <Previwer />}
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AntTabs
              value={currentTab}
              onChange={handleChange}
              aria-label='ant example'
            >
              <AntTab label='Images' />
              <AntTab label='360 Images' />
              <AntTab label='Video' />
              <AntTab label='360 Videos' />
            </AntTabs>
            {Tabs[currentTab]}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default TableFiles





export const ImageGrid = ({
  asset,
  onOpenPreviewer
}: {
  asset: Asset
  onOpenPreviewer: Function
}) => {
  const { deleteAsset } = useContext(AssetsContext)

  const [isPopperVisible, setIsPopperVisible] = useState<boolean>(false)
  const [isDeleteHoverd, setIsDeleteHoverd] = useState(false)
  const [isImageHovered, setIsImageHoverd] = useState(false)
  const classes = useStylesFiles()
  const assetIsVideo =
    asset.typeAsset.id === FILES_TYPES.VIDEO ||
    asset.typeAsset.id === FILES_TYPES.VIDEO_360

  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    const heavyImage: HTMLImageElement = document.createElement('img')
    heavyImage.onload = () => setCurrentImage(heavyImage.src)
    heavyImage.src = assetIsVideo ? asset.thumbnail : asset.url
  }, [assetIsVideo ? asset.thumbnail : asset.url])

  const onDeleteAsset = () => {
    deleteAsset(asset.uuid)
  }

  return (
    <div
      style={{
        borderRadius: '0.3rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsImageHoverd(true)}
      onMouseLeave={() => {
        setIsPopperVisible(false)
        setIsImageHoverd(false)
      }}
      onClick={() => {
        if (!isDeleteHoverd && !isPopperVisible) {
          onOpenPreviewer(asset)
        }
      }}
    >
      {isImageHovered && (
        <Box
          position='absolute'
          className='animate-fadein-1s'
          top={0}
          height='2rem'
          width='2rem'
          display='flex'
          justifyContent='center'
          alignItems='center'
          borderRadius='100%'
          right={0}
          ml={1}
          style={{
            backgroundColor: '#374980',
            margin: '0.1rem'
          }}
        >
          <Popover
            placement='bottom'
            content={
              <Space direction='vertical' align='end'>
                <span style={{ fontFamily: 'font2' }}>
                  Are you sure you want to <br /> delete this image?
                </span>
                <Space>
                  <ButtonAnt
                    onClick={() => setIsPopperVisible(false)}
                    size='small'
                    className={classes.buttonCancel}
                  >
                    Cancel
                  </ButtonAnt>
                  <ButtonAnt
                    onClick={onDeleteAsset}
                    size='small'
                    className={classes.buttonOk}
                  >
                    Delete
                  </ButtonAnt>
                </Space>
              </Space>
            }
            trigger='click'
            visible={isPopperVisible}
          >
            <DeleteOutlineOutlinedIcon
              onMouseEnter={() => setIsDeleteHoverd(true)}
              onMouseLeave={() => setIsDeleteHoverd(false)}
              onClick={() => setIsPopperVisible(!isPopperVisible)}
              style={{
                color: 'white'
              }}
            />
          </Popover>
        </Box>
      )}
      {currentImage ? (
        <img
          style={{
            width: '100%',
            minHeight: '100%',
            objectFit: 'cover'
          }}
          alt='Image'
          title='Image'
          src={assetIsVideo ? asset.thumbnail : asset.url}
        />
      ) : (
        <div
          style={{
            width: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spin />
        </div>
      )}
    </div>
  )
}







export const useStylesFiles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    borderBottom: '2rem solid',
    borderTopColor: COLORS.GRAY_MEDIUM,
    borderBottomColor: COLORS.GRAY_MEDIUM
  },
  gridImages: {
    display: 'grid',
    gridAutoRows: '1fr',
    gridTemplateColumns: '200px 200px'
  },
  paper: {
    height: '100%'
  },
  warn: {
    backgroundColor: 'rgba(36, 37, 38, 0.6)'
  },
  containerUpload: {
    padding: '1rem',
    flex: 1
  },
  uploadButton: {
    marginLeft: '1rem',
    minWidth: '10rem',
    backgroundColor: '#45A0C5',
    fontSize: '0.75rem',
    textTransform: 'capitalize'
  },
  gridList: {
    width: '100%',
    height: '90%'
  },
  buttonCancel: {
    borderRadius: '2px',
    borderColor: 'rgba(69, 160, 197, 1)',
    color: '#45A0C5'
  },
  buttonOk: {
    borderRadius: '2px',
    backgroundColor: '#45A0C5',
    color: 'white'
  }
}))

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs)

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      width: 200,

      minHeight: '4rem',
      fontSize: '1.125rem',
      color: '#A6ABAF',
      marginRight: theme.spacing(4),
      fontFamily: [
        'font3',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:hover': {
        color: '#242526',
        opacity: 1
      },
      '&$selected': {
        color: '#242526'
      },
      '&:focus': {
        color: '#242526'
      }
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)
