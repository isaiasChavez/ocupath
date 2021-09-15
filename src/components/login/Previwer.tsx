import { Box, LinearProgress } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined'
import SkipPreviousOutlinedIcon from '@material-ui/icons/SkipPreviousOutlined'
import CloseIcon from '@material-ui/icons/Close'
import AssetsContext, { Asset } from '../../context/assets/assets.context'
import { FILES_TYPES } from '../../types'
import { useContext, useState } from 'react'
import MaxViewer from '../general/MaxViewer'

interface PreviewProps {}

const Previwer: React.FC<PreviewProps> = () => {
  const {
    currentAsset,
    currentAssets,
    previewIsImage,
    closePreviewer,
    deleteAsset,
    loading
  } = useContext(AssetsContext)

  const nameImage = () => {
    let newName
    console.log(currentAsset.url)
    if (previewIsImage) {
      newName = currentAsset.url.replace(
        'https://ocupath.fra1.digitaloceanspaces.com/image/',
        ''
      )
    } else {
      newName = currentAsset.thumbnail.replace(
        'https://ocupath.fra1.digitaloceanspaces.com/video/',
        ''
      )
      newName = currentAsset.thumbnail.replace(
        'https://ocupath.fra1.digitaloceanspaces.com/video360/',
        ''
      )
    }
    return newName
  }
   const onDeleteAsset =()=>{
    deleteAsset(currentAsset.uuid)
  }
  console.log({ currentAsset, previewIsImage })

  if(currentAssets.length===0){
     closePreviewer()
  }

  return (
    <>
    
      <Box
        position='fixed'
        zIndex={200}
        display='flex'
        justifyContent='center'
        alignItems='center'
        top={0}
        left={0}
        right={0}
        bottom={0}
        className="animate-fadein"
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}
      >

        <Box
          minWidth='80vw'
          width='80vw'
          height='80vh'
          style={{
            backgroundColor: '#000',
            boxShadow: '-1px 0px 13px 0px rgba(0,0,0,0.75)',
            borderRadius: '8pt'
          }}
        >
          <Box height='10%' width='100%' display='flex' alignItems='center'>
            <Box flex='0.92' textAlign='center' color='white'>
              {nameImage()}
            </Box>
            <Box flex='0.08' display='flex' justifyContent='center'>
              <DeleteOutlineOutlinedIcon
                style={{
                  color: '#FFF',
                  cursor: 'pointer',
                  marginRight: '1rem',
                  opacity:loading?0.5:1
                }}
                onClick={() => {
                  if (!loading) {
                  onDeleteAsset()  
                  }
                  }}
              />
              <CloseIcon
                onClick={() => closePreviewer()}
                style={{
                  color: '#FFF',
                  cursor: 'pointer'
                }}
              />
            </Box>
          </Box>
          <Box width='100%' height='80%' style={{ backgroundColor: '#282828' }}>
            <Box height='80%' display='flex' alignItems='center'>
              <Box
                height='80%'
                width='100%'
                display='flex'
                justifyContent='center'
              >
                <Box position='relative' height='100%'>
                  {previewIsImage ? (
                    <img
                      src={
                        previewIsImage
                          ? currentAsset.url
                          : currentAsset.thumbnail
                      }
                      style={{
                        objectFit: 'contain',
                        height: '100%',
                        opacity:loading?0.5:1
                      }}
                      alt=''
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        height: '100%'
                      }}
                    >
                      <source src={currentAsset.url} type='video/mp4' />
                      Tu navegador no soporta vídeos
                    </video>
                  )}
                  {previewIsImage&&<BottomControls  />}
                </Box>
              </Box>
            </Box>
            <Box height='20%' display='flex' px={2} pb={1}>
              {currentAssets.map((asset: Asset, i) => (
                <BottomImage key={`${i}${asset.thumbnail}`} asset={asset} />
              ))}
            </Box>
          </Box>
          <Box width='100%' height='10%'>

          </Box>
        </Box>
      </Box>
    </>
  )
}

const BottomImage = ({ asset }: { asset: Asset }) => {
  const { selectAsset, previewIsImage, currentAsset,loading } = useContext(
    AssetsContext
  )

  const isTheCurrent = currentAsset.uuid === asset.uuid

  return (
    <Box
      onClick={() => {
        if (!loading) {  
          selectAsset(asset)}
        }
        }
      width='15%'
      maxHeight='8rem'
      maxWidth='8rem'
      mr='0.3rem'
      borderRadius='4pt'
      height='100%'
      overflow='hidden'
      style={{
        border: isTheCurrent ? '1px solid white' : 'none',
        cursor: loading?'default':'pointer'
      }}
      className='animate-elevate'
    >
      <img
        src={previewIsImage ? asset.url : asset.thumbnail}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          opacity:loading?0.5:1
        }}
        alt=''
      />
    </Box>
  )
}

function BottomControls () {
  const { prevPreview, nextPreview, currentAsset, currentAssets,loading } = useContext(
    AssetsContext
  )

  const [isMaxViewerVisible, setisMaxViewerVisible] = useState(false)
  let indiceCurrent = currentAssets.findIndex(
    (asset: Asset) => asset.uuid === currentAsset.uuid
  )
  const closeMaxViewer=()=>{
    setisMaxViewerVisible(false)
  }
  const openMaxViewer=()=>{
    if (!loading) {
      setisMaxViewerVisible(true)
    }
  }
    
  const isTheFirst = indiceCurrent === 0
  const isTheLast = indiceCurrent === currentAssets.length - 1

  const stylesIcons = { color: 'white', cursor: 'pointer', fontSize: '2rem' }
  return (
    <>
    {isMaxViewerVisible&&<MaxViewer closeMaxViewer={closeMaxViewer} />}

    <Box
      height='10%'
      position='absolute'
      
      bottom={0}
      display='flex'
      justifyContent='center'
      left={0}
      right={0}
      style={{ backgroundColor: 'rgba(36, 37, 38, 0.4)' }}
      >
      <Box
        display='flex'
        height='100%'
        minWidth='31.75rem'
        maxWidth='31.75rem'
        justifyContent='space-between'
        alignItems='center'
        >
        <Box></Box>
        <Box>
          <SkipPreviousOutlinedIcon
            onClick={() => {
              if (!isTheFirst&&!loading) {
                prevPreview()
              }
            }}
            style={{
              ...stylesIcons,
              opacity: isTheFirst ? 0 : 1,
              cursor: isTheFirst ? 'default' : 'pointer'
            }}
          />
          <SkipNextOutlinedIcon
            onClick={() => {
              if (!isTheLast&&!loading) {
                nextPreview()
              }
            }}
            style={{
              ...stylesIcons,
              marginLeft: '1rem',
              opacity: isTheLast ? 0 : 1,
              cursor: isTheLast ? 'default' : 'pointer'
            }}
            />
        </Box>
        <Box>
          <FullscreenIcon onClick={openMaxViewer} style={stylesIcons} />
        </Box>
      </Box>
    </Box>
            </>
  )
}

export default Previwer
