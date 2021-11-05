import { Box, CircularProgress } from '@material-ui/core'
import {
  FILES_TYPES,
  Images,
} from '../../types'

export interface DropZoneProps {
  isDragActive: boolean
  loading: boolean
  isEmpty: boolean
  text: string
  type: FILES_TYPES
}

const DropZone: React.FC<DropZoneProps> = ({
  isDragActive,
  isEmpty,
  loading,
  text,
  type
}) => {
  const correctImage = () => {
    switch (type) {
      case FILES_TYPES.IMG:
        return Images.drop.dropimages
      case FILES_TYPES.IMG_360:
        return Images.drop.dropimages360
      case FILES_TYPES.VIDEO:
        return Images.drop.dropvideo
      case FILES_TYPES.VIDEO_360:
        return Images.drop.dropvideo360
      default:
        return Images.drop.dropimages
        break
    }
  }

  return (
    <>
      {isDragActive && (
        <Box
          className='animate-fadein'
          position='absolute'
          zIndex={40}
          display='flex'
          justifyContent='center'
          alignItems='center'
          mb={1.3}
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{
            backgroundColor: 'rgba(255,255,255,0.4)'
          }}
        >
          <Box display='flex' flexDirection='column'>
            <img
              style={{ opacity: '0.5' }}
              src={Images.upload}
              alt='Upload your image'
            />
            <Box mt={2} fontSize={12}>
              {text}{' '}
            </Box>
          </Box>
        </Box>
      )}
      {isEmpty && !loading && !isDragActive && (
        <Box
          className='animate-fadein'
          position='absolute'
          zIndex={40}
          display='flex'
          justifyContent='center'
          alignItems='center'
          mb={10}
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{
            backgroundColor: 'rgba(255,255,255,0.4)'
          }}
        >
          <Box display='flex' flexDirection='column'>
            <img
              style={{ opacity: '0.5' }}
              src={correctImage()}
              alt='Upload your image'
            />
          </Box>
        </Box>
      )}
      {loading && (
        <Box
          position='absolute'
          display='flex'
          zIndex={30}
          justifyContent='center'
          alignItems='center'
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{
            background: 'rgba(0, 13, 52, 0.1)'
          }}
        >
          <CircularProgress color='secondary' size='2rem' />
        </Box>
      )}
    </>
  )
}

export default DropZone